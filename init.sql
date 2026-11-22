-- E-shop database schema
-- Run on first container startup via docker-entrypoint-initdb.d

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price INTEGER NOT NULL DEFAULT 0, -- cents
  compare_price INTEGER, -- cents
  category VARCHAR(100) NOT NULL,
  category_label VARCHAR(100) NOT NULL,
  image TEXT,
  weight VARCHAR(50),
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  bestseller BOOLEAN DEFAULT FALSE,
  new_arrival BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promos (
  id VARCHAR(255) PRIMARY KEY,
  code VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL DEFAULT 'percentage', -- percentage | fixed
  value INTEGER NOT NULL DEFAULT 0, -- percentage points or cents
  applies_to VARCHAR(20) NOT NULL DEFAULT 'all', -- all | category | product
  target_id VARCHAR(255),
  min_spend INTEGER DEFAULT 0, -- cents
  max_uses INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(255) PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city VARCHAR(100) NOT NULL,
  customer_zip VARCHAR(20) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  subtotal INTEGER NOT NULL DEFAULT 0, -- cents
  discount INTEGER NOT NULL DEFAULT 0, -- cents
  promo_code VARCHAR(100),
  total INTEGER NOT NULL DEFAULT 0, -- cents
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending | paid | fulfilled | shipped | cancelled
  payment_method VARCHAR(50) NOT NULL DEFAULT 'mpesa', -- mpesa | card
  payment_reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0, -- cents
  quantity INTEGER NOT NULL DEFAULT 1,
  total INTEGER NOT NULL DEFAULT 0, -- cents
  weight VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_promos_code ON promos(code);

-- Seed data: Products
INSERT INTO products (id, name, description, short_description, price, compare_price, category, category_label, image, weight, stock, featured, bestseller, new_arrival) VALUES
('ethiopia-yirgacheffe', 'Ethiopia Yirgacheffe', 'A bright, floral single-origin from the birthplace of coffee. Washed process brings out jasmine and citrus notes with a clean, tea-like body.', 'Floral, bright, tea-like single-origin.', 2200, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1447933601403-0c698afde45e?q=80&w=800&auto=format&fit=crop', '250 g', 34, TRUE, TRUE, FALSE),
('colombia-huila', 'Colombia Huila', 'Balanced and approachable, this medium roast from Huila offers caramel sweetness, red apple, and a smooth finish.', 'Caramel, red apple, smooth everyday cup.', 1900, 2100, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1495474472287-4d71bc78a991?q=80&w=800&auto=format&fit=crop', '250 g', 52, TRUE, FALSE, FALSE),
('sumatra-mandheling', 'Sumatra Mandheling', 'Deep, earthy, and full-bodied. Dark chocolate and spice with low acidity. A classic choice for French press or cold brew.', 'Earthy, dark chocolate, full-bodied.', 2000, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1509059388597-a9961a6e8ac2?q=80&w=800&auto=format&fit=crop', '250 g', 28, FALSE, FALSE, FALSE),
('house-blend', 'House Blend', 'Our signature blend: chocolate, nut, and a hint of citrus. Consistent and crowd-pleasing, morning after morning.', 'Chocolate, nut, crowd-pleasing.', 1700, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1559056199-641a0a8b852e?q=80&w=800&auto=format&fit=crop', '500 g', 60, FALSE, TRUE, FALSE),
('espresso-blend', 'Espresso Blend', 'Developed for the machine. Syrupy body with dark chocolate and a lingering caramel crema.', 'Syrupy, dark chocolate, caramel crema.', 2100, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1517657613422-3a1321c678d0?q=80&w=800&auto=format&fit=crop', '500 g', 40, TRUE, FALSE, FALSE),
('matcha-latte', 'Ceremonial Matcha', 'Vibrant green tea from Uji, whisked into a creamy latte or enjoyed straight.', 'Vibrant green tea, creamy latte.', 2600, NULL, 'tea', 'Tea', 'https://images.unsplash.com/photo-1615186893837-c1435f0c9a8b?q=80&w=800&auto=format&fit=crop', '30 g', 26, FALSE, FALSE, TRUE),
('chai-concentrate', 'Spiced Chai Concentrate', 'Cardamom, cinnamon, ginger, and black tea reduced to a concentrate. Mix with milk over ice.', 'Cardamom, cinnamon, ginger concentrate.', 1600, NULL, 'tea', 'Tea', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop', '250 g', 18, FALSE, FALSE, FALSE),
('french-press', 'Glass French Press', '8-cup borosilicate glass press with a stainless-steel plunger. Simple, timeless, and makes a clean cup.', '8-cup glass press, stainless plunger.', 3400, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1535034622062-6e189756853d?q=80&w=800&auto=format&fit=crop', '1 L', 14, FALSE, FALSE, FALSE),
('pour-over-dripper', 'Ceramic Pour-Over Dripper', 'Cone-shaped ceramic dripper for controlled, hands-on brewing.', 'Ceramic cone dripper for control.', 2800, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1529656337949-f1eeb8b004df?q=80&w=800&auto=format&fit=crop', '1 unit', 20, FALSE, FALSE, FALSE),
('gooseneck-kettle', 'Gooseneck Kettle', 'Temperature-controlled gooseneck kettle for precise pour-overs. Holds heat for 60 minutes.', 'Temp-controlled, precise pouring.', 7800, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1585465275093-547788396e0d?q=80&w=800&auto=format&fit=crop', '1 unit', 8, FALSE, FALSE, FALSE),
('chef-knife', 'Chef\'s Knife', '8-inch high-carbon stainless chef\'s knife with a ergonomic handle. The workhorse of any kitchen.', '8-inch high-carbon chef\'s knife.', 8400, 9600, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1590047093189-1a717693ee31?q=80&w=800&auto=format&fit=crop', '1 unit', 12, TRUE, FALSE, FALSE),
('cast-iron-skillet', 'Cast Iron Skillet', '12-inch pre-seasoned cast iron skillet. Goes from stovetop to oven and lasts generations.', '12-inch pre-seasoned cast iron.', 5200, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', '1 unit', 16, FALSE, FALSE, FALSE),
('canvas-tote', 'Canvas Tote Bag', 'Heavyweight organic cotton tote with a screen-printed design. Carry your goods in style.', 'Organic cotton tote bag.', 2600, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1553346708-fd2820b91233?q=80&w=800&auto=format&fit=crop', '1 unit', 36, FALSE, FALSE, FALSE),
('glass-mug', 'Double-Wall Glass Mug', 'Double-wall borosilicate glass keeps your drink hot and your hands cool.', 'Double-wall glass, stays hot.', 2200, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1563399679-79793c401572?q=80&w=800&auto=format&fit=crop', '1 unit', 29, FALSE, FALSE, FALSE),
('throw-blanket', 'Cotton Throw Blanket', 'Soft woven cotton throw in a neutral stripe. Perfect for the sofa or the foot of the bed.', 'Woven cotton throw, neutral stripe.', 6800, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1543734497-0921c7f3c8b3?q=80&w=800&auto=format&fit=crop', '1 unit', 22, FALSE, FALSE, TRUE),
('ceramic-vase', 'Ceramic Vase', 'Hand-thrown ceramic vase in matte glaze. Holds fresh flowers or stands alone.', 'Hand-thrown ceramic vase.', 4400, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1518675471968-0c123d7e83f6?q=80&w=800&auto=format&fit=crop', '1 unit', 11, FALSE, FALSE, FALSE),
('aroma-diffuser', 'Aroma Diffuser', 'Ultrasonic essential oil diffuser with soft LED glow. Quiet operation for any room.', 'Ultrasonic oil diffuser with LED glow.', 4200, NULL, 'wellness', 'Wellness', 'https://images.unsplash.com/photo-1601021059028-b024e4a0c080?q=80&w=800&auto=format&fit=crop', '1 unit', 18, FALSE, FALSE, FALSE),
('yoga-mat', 'Yoga Mat', 'Non-slip, extra-thick yoga mat with carrying strap. For practice anywhere.', 'Non-slip yoga mat with strap.', 3800, NULL, 'wellness', 'Wellness', 'https://images.unsplash.com/photo-1544367567-0f2dde668912?q=80&w=800&auto=format&fit=crop', '1 unit', 30, TRUE, FALSE, FALSE),
('herbal-tea', 'Herbal Tea Sampler', 'Six caffeine-free herbal blends: chamomile, peppermint, rooibos, hibiscus, lemongrass, and ginger.', 'Six caffeine-free herbal blends.', 2400, NULL, 'wellness', 'Wellness', 'https://images.unsplash.com/photo-1565537577292-d05b9388a906?q=80&w=800&auto=format&fit=crop', '6 × 40 g', 40, FALSE, FALSE, FALSE),
('organic-tee', 'Organic Cotton Tee', 'Soft, heavyweight organic cotton t-shirt in a relaxed fit. Pre-shrunk and built to last.', 'Heavyweight organic cotton tee.', 3400, NULL, 'apparel', 'Apparel', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', '1 unit', 44, FALSE, FALSE, FALSE),
('wool-socks', 'Merino Wool Socks', 'Temperature-regulating merino wool socks, reinforced heel and toe. Three pairs.', 'Merino wool socks, 3 pairs.', 2800, NULL, 'apparel', 'Apparel', 'https://images.unsplash.com/photo-1604744826267-0a56a5b9c218?q=80&w=800&auto=format&fit=crop', '1 unit', 50, FALSE, FALSE, FALSE),
('cookbook', 'Seasonal Cookbook', 'A cookbook organized by season, with simple recipes that let ingredients shine.', 'Seasonal recipes, ingredient-led.', 3200, NULL, 'books', 'Books', 'https://images.unsplash.com/photo-1544947951-fa475153bb82?q=80&w=800&auto=format&fit=crop', '1 unit', 25, FALSE, FALSE, TRUE),
('notebook', 'Lined Notebook', '160 dotted pages, cloth cover, lay-flat binding. For notes, lists, and ideas.', '160 dotted pages, cloth cover.', 1800, NULL, 'books', 'Books', 'https://images.unsplash.com/photo-1515753908618-064795f5e8d6?q=80&w=800&auto=format&fit=crop', '1 unit', 60, FALSE, FALSE, FALSE),
('wireless-charger', 'Wireless Charging Pad', '10W wireless charging pad with silicone surface. Compatible with Qi-enabled devices.', '10W Qi wireless charger.', 3600, NULL, 'tech', 'Tech', 'https://images.unsplash.com/photo-1583497447615-3a28306b8fde?q=80&w=800&auto=format&fit=crop', '1 unit', 28, FALSE, FALSE, FALSE),
('bluetooth-speaker', 'Portable Bluetooth Speaker', 'Water-resistant portable speaker with 12-hour battery and rich sound.', 'Water-resistant, 12-hour battery.', 6400, NULL, 'tech', 'Tech', 'https://images.unsplash.com/photo-1589490333741-77f2fe2714e6?q=80&w=800&auto=format&fit=crop', '1 unit', 14, TRUE, FALSE, FALSE),
-- More Coffee
('kenya-aa', 'Kenya AA', 'Bold and juicy with blackcurrant and wine-like acidity. A high-grown AA lot that shines as a pour-over.', 'Blackcurrant, wine-like, bright.', 2400, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1510707565773-92065ed4a924?q=80&w=800&auto=format&fit=crop', '250 g', 19, FALSE, FALSE, TRUE),
('decaf-swiss-water', 'Decaf (Swiss Water)', 'All the flavor, none of the kick. Swiss Water Process decaf with notes of toasted hazelnut and milk chocolate.', 'Caffeine-free, hazelnut, milk chocolate.', 1900, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1559056199-641a0a8b852e?q=80&w=800&auto=format&fit=crop', '250 g', 22, FALSE, FALSE, FALSE),
('cold-brew-pack', 'Cold Brew Pack', 'Coarsely ground and pre-portioned for cold brew. Steep overnight for a smooth, chocolatey concentrate.', 'Pre-portioned, smooth concentrate.', 1800, NULL, 'coffee', 'Coffee', 'https://images.unsplash.com/photo-1461023303754-38886272711f?q=80&w=800&auto=format&fit=crop', '6 × 50 g', 31, FALSE, FALSE, FALSE),
-- More Tea
('earl-grey', 'Earl Grey Tea', 'Classic black tea bergamot blend. Aromatic and refreshing, perfect with or without milk.', 'Black tea, bergamot, citrus.', 1500, NULL, 'tea', 'Tea', 'https://images.unsplash.com/photo-1558709148-75c54b37a11f?q=80&w=800&auto=format&fit=crop', '50 g', 45, FALSE, FALSE, FALSE),
('jasmine-tea', 'Jasmine Green Tea', 'Delicate green tea scented with fresh jasmine blossoms. Floral, soothing, and lightly caffeinated.', 'Green tea, jasmine, floral.', 1800, NULL, 'tea', 'Tea', 'https://images.unsplash.com/photo-1556677392-0222a48703c9?q=80&w=800&auto=format&fit=crop', '50 g', 38, FALSE, FALSE, TRUE),
-- More Kitchen
('mortar-pestle', 'Granite Mortar & Pestle', 'Heavy-duty granite set for grinding spices, herbs, and making fresh pastes. Essential for authentic cooking.', 'Granite, 6-inch, heavy base.', 4200, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1597132037227-f2447033485e?q=80&w=800&auto=format&fit=crop', '2 kg', 15, FALSE, FALSE, FALSE),
('spice-rack', 'Bamboo Spice Rack', 'Wall-mounted bamboo spice rack with 12 glass jars. Keeps your kitchen organized and spices within reach.', 'Bamboo, 12 jars included.', 5200, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1596395707740-221e0e7e7661?q=80&w=800&auto=format&fit=crop', '1 unit', 20, FALSE, FALSE, FALSE),
('cutting-board', 'Wooden Cutting Board', 'End-grain maple cutting board, gentle on knives and beautiful on the counter. Food-safe oil finish.', 'Maple, 14 × 10 inches.', 3800, NULL, 'kitchen', 'Kitchen', 'https://images.unsplash.com/photo-1588676815822-444c9925b9bf?q=80&w=800&auto=format&fit=crop', '1 unit', 25, FALSE, TRUE, FALSE),
-- More Home
('scented-candle', 'Scented Candle', 'Soy wax candle with essential oils. Vanilla and sandalwood scent. 40-hour burn time.', 'Vanilla sandalwood, 220 g.', 2400, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1606003191613-834721ba8492?q=80&w=800&auto=format&fit=crop', '220 g', 50, FALSE, FALSE, TRUE),
('picture-frame', 'Wooden Picture Frame', 'Set of 3 minimalist wooden frames in natural oak. Holds 4 × 6 and 5 × 7 inch photos.', 'Oak, set of 3.', 3200, NULL, 'home', 'Home', 'https://images.unsplash.com/photo-1587620962725-abab77b7cf72?q=80&w=800&auto=format&fit=crop', '1 unit', 30, FALSE, FALSE, FALSE),
-- More Wellness
('essential-oils', 'Essential Oil Set', '6-pack of pure essential oils: lavender, peppermint, eucalyptus, tea tree, lemon, and rosemary.', '10 mL each, therapeutic grade.', 4800, NULL, 'wellness', 'Wellness', 'https://images.unsplash.com/photo-1601870707811-1066c23a10f4?q=80&w=800&auto=format&fit=crop', '6 × 10 mL', 28, FALSE, FALSE, FALSE),
('resistance-bands', 'Resistance Bands Set', '5-level resistance bands for home workouts. Includes door anchor and carry bag.', 'Light to extra-heavy.', 3200, NULL, 'wellness', 'Wellness', 'https://images.unsplash.com/photo-1571019613353-48aba8167af3?q=80&w=800&auto=format&fit=crop', '1 set', 40, FALSE, FALSE, FALSE),
-- More Apparel
('linen-shirt', 'Linen Button Shirt', 'Breathable linen shirt in natural sand. Relaxed fit, coconut shell buttons. Perfect for warm days.', 'Linen, natural sand.', 5600, NULL, 'apparel', 'Apparel', 'https://images.unsplash.com/photo-1576798713725-22385971037a?q=80&w=800&auto=format&fit=crop', '1 unit', 22, FALSE, FALSE, TRUE),
('canvas-cap', 'Canvas Cap', 'Unstructured canvas cap with curved brim and adjustable strap. Embroidered logo on front.', 'Cotton canvas, one size.', 2200, NULL, 'apparel', 'Apparel', 'https://images.unsplash.com/photo-1552550171-71779e7a1a5e?q=80&w=800&auto=format&fit=crop', '1 unit', 60, FALSE, FALSE, FALSE),
-- More Books
('field-guide', 'East African Field Guide', 'Illustrated field guide to East African birds, mammals, and plants. Essential for nature lovers.', 'Paperback, 240 pages.', 3800, NULL, 'books', 'Books', 'https://images.unsplash.com/photo-1544947951-fa475153bb82?q=80&w=800&auto=format&fit=crop', '1 unit', 18, FALSE, FALSE, FALSE),
('journal', 'Leather Journal', 'Hand-bound leather journal with 120 lined pages. Lay-flat binding, acid-free paper.', 'Leather cover, A5.', 4200, NULL, 'books', 'Books', 'https://images.unsplash.com/photo-1505118287706-70804777766b?q=80&w=800&auto=format&fit=crop', '1 unit', 32, FALSE, FALSE, FALSE),
-- More Tech
('power-bank', 'Power Bank 10000mAh', 'Slim 10000 mAh power bank with dual USB-A ports. Fast charging for phones and tablets.', '10000 mAh, dual USB.', 3400, NULL, 'tech', 'Tech', 'https://images.unsplash.com/photo-1602067332252-823e35c5c134?q=80&w=800&auto=format&fit=crop', '1 unit', 35, FALSE, FALSE, FALSE),
('phone-stand', 'Bamboo Phone Stand', 'Minimalist bamboo phone stand with charging cutout. Holds phones in portrait and landscape.', 'Bamboo, adjustable angle.', 1800, NULL, 'tech', 'Tech', 'https://images.unsplash.com/photo-1584530372175-0881820f95c3?q=80&w=800&auto=format&fit=crop', '1 unit', 45, FALSE, FALSE, FALSE);

-- Seed data: Promos
INSERT INTO promos (id, code, description, type, value, applies_to, target_id, min_spend, max_uses, used_count, expires_at, active) VALUES
('promo-1', 'WELCOME10', '10% off your first order', 'percentage', 10, 'all', NULL, 1000, 100, 12, '2027-12-31', TRUE),
('promo-2', 'COFFEE200', 'KSh 200 off coffee orders over KSh 1000', 'fixed', 200, 'category', 'coffee', 1000, 50, 8, '2026-12-31', TRUE),
('promo-3', 'FREESHIP', 'Free shipping on all orders', 'fixed', 0, 'all', NULL, 0, 200, 45, '2027-06-30', TRUE);
