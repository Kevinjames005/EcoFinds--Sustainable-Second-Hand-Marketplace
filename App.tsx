import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ProductProvider, useProducts } from './context/ProductContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import AddEditProductPage from './pages/AddEditProductPage.tsx';
import MyListingsPage from './pages/MyListingsPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CartPage from './pages/CartPage.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import FullScreenLoader from './components/FullScreenLoader.tsx';
import GlobalBackground from './components/GlobalBackground.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <FullScreenLoader />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { loading: productsLoading } = useProducts();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (authLoading || productsLoading) {
    return <FullScreenLoader />;
  }
  
  // Show header on homepage only if logged in
  const showHeader = !isHomePage || (isHomePage && !!currentUser);
  // Add padding to homepage only if logged in
  const addPadding = !isHomePage || (isHomePage && !!currentUser);

  return (
    <div className="bg-e-black min-h-screen font-sans text-e-white">
      <GlobalBackground />
      {showHeader && <Header />}
      <main className={addPadding ? "relative z-10 container mx-auto p-4 md:p-6" : "relative z-10"}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/add" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
          <Route path="/edit/:productId" element={<ProtectedRoute><AddEditProductPage /></ProtectedRoute>} />
          <Route path="/my-listings" element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;