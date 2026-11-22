import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import Admin from './components/Admin';
import { CartProvider } from './context/CartContext';
import { PromoProvider } from './context/PromoContext';

function Home() {
  return <Hero />;
}

export default function App() {
  return (
    <CartProvider>
      <PromoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<ProductGrid />} />
              <Route path="shop/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PromoProvider>
    </CartProvider>
  );
}
