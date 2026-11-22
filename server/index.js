import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://eshop:eshop_password@localhost:5432/eshop',
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// ---------- PRODUCTS ----------
app.get('/api/products', async (req, res) => {
  const { category, featured, bestseller, new: isNew } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  if (category) { params.push(category); query += ` AND category = $${params.length}`; }
  if (featured === 'true') { query += ` AND featured = TRUE`; }
  if (bestseller === 'true') { query += ` AND bestseller = TRUE`; }
  if (isNew === 'true') { query += ` AND new_arrival = TRUE`; }
  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, params);
  res.json(result.rows);
});

app.get('/api/products/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
  res.json(result.rows[0]);
});

app.post('/api/products', async (req, res) => {
  const { name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival } = req.body;
  const id = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  const result = await pool.query(
    `INSERT INTO products (id, name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [id, name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/api/products/:id', async (req, res) => {
  const { name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival } = req.body;
  const result = await pool.query(
    `UPDATE products SET name=$2, description=$3, short_description=$4, price=$5, compare_price=$6,
     category=$7, category_label=$8, image=$9, weight=$10, stock=$11, featured=$12, bestseller=$13, new_arrival=$14, updated_at=NOW()
     WHERE id=$1 RETURNING *`,
    [req.params.id, name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
  res.json(result.rows[0]);
});

app.delete('/api/products/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

// ---------- PROMOS ----------
app.get('/api/promos', async (req, res) => {
  const result = await pool.query('SELECT * FROM promos ORDER BY created_at DESC');
  res.json(result.rows);
});

app.get('/api/promos/:code', async (req, res) => {
  const result = await pool.query('SELECT * FROM promos WHERE code = $1 AND active = TRUE', [req.params.code]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Promo not found' });
  const promo = result.rows[0];
  if (promo.expires_at && new Date(promo.expires_at) < new Date()) return res.status(400).json({ error: 'Promo expired' });
  if (promo.max_uses && promo.used_count >= promo.max_uses) return res.status(400).json({ error: 'Promo usage limit reached' });
  res.json(promo);
});

app.post('/api/promos', async (req, res) => {
  const { code, description, type, value, applies_to, target_id, min_spend, max_uses, expires_at, active } = req.body;
  const id = code.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  const result = await pool.query(
    `INSERT INTO promos (id, code, description, type, value, applies_to, target_id, min_spend, max_uses, expires_at, active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [id, code, description, type, value, applies_to, target_id, min_spend, max_uses, expires_at, active !== false]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/api/promos/:id', async (req, res) => {
  const { code, description, type, value, applies_to, target_id, min_spend, max_uses, expires_at, active } = req.body;
  const result = await pool.query(
    `UPDATE promos SET code=$2, description=$3, type=$4, value=$5, applies_to=$6, target_id=$7, min_spend=$8, max_uses=$9, expires_at=$10, active=$11
     WHERE id=$1 RETURNING *`,
    [req.params.id, code, description, type, value, applies_to, target_id, min_spend, max_uses, expires_at, active]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Promo not found' });
  res.json(result.rows[0]);
});

app.delete('/api/promos/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM promos WHERE id = $1 RETURNING *', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Promo not found' });
  res.json({ message: 'Promo deleted' });
});

app.post('/api/promos/:id/toggle', async (req, res) => {
  const result = await pool.query('UPDATE promos SET active = NOT active WHERE id = $1 RETURNING id, active', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Promo not found' });
  res.json(result.rows[0]);
});

// ---------- ORDERS ----------
app.get('/api/orders', async (req, res) => {
  const result = await pool.query(`
    SELECT o.*, 
      (SELECT json_agg(oi ORDER BY oi.id) FROM order_items oi WHERE oi.order_id = o.id) as items
    FROM orders o ORDER BY o.created_at DESC
  `);
  res.json(result.rows);
});

app.get('/api/orders/:id', async (req, res) => {
  const result = await pool.query(`
    SELECT o.*, 
      (SELECT json_agg(oi ORDER BY oi.id) FROM order_items oi WHERE oi.order_id = o.id) as items
    FROM orders o WHERE o.id = $1
  `, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
  res.json(result.rows[0]);
});

app.post('/api/orders', async (req, res) => {
  const { customer, items, subtotal, discount, promo_code, total, status, payment_method, payment_reference } = req.body;
  const orderNumber = 'E' + Math.floor(1000 + Math.random() * 9000) + Date.now().toString().slice(-6);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      `INSERT INTO orders (order_number, customer_email, customer_name, customer_address, customer_city, customer_zip, customer_phone, subtotal, discount, promo_code, total, status, payment_method, payment_reference)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [orderNumber, customer.email, customer.name, customer.address, customer.city, customer.zip, customer.phone, subtotal, discount, promo_code, total, status, payment_method, payment_reference]
    );
    const order = orderResult.rows[0];
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity, total, weight) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [order.id, item.productId, item.name, item.price, item.quantity, item.total, item.weight]
      );
    }
    await client.query('COMMIT');
    res.status(201).json({ ...order, items });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  const result = await pool.query('UPDATE orders SET status = $2 WHERE id = $1 RETURNING *', [req.params.id, status]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
  res.json(result.rows[0]);
});

app.get('/api/orders/stats', async (req, res) => {
  const orders = await pool.query('SELECT * FROM orders');
  const rows = orders.rows;
  const totalSales = rows.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const paidOrders = rows.filter((o) => o.status === 'paid' || o.status === 'fulfilled' || o.status === 'shipped').length;
  const pendingOrders = rows.filter((o) => o.status === 'pending').length;
  const fulfilledOrders = rows.filter((o) => o.status === 'fulfilled' || o.status === 'shipped').length;
  res.json({
    totalOrders: rows.length,
    totalSales,
    pendingOrders,
    paidOrders,
    fulfilledOrders,
    averageOrderValue: rows.length > 0 ? Math.round(totalSales / rows.length) : 0,
  });
});

app.listen(port, () => {
  console.log(`E-shop server running on http://localhost:${port}`);
});
