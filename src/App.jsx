import { Routes, Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './Home.jsx';
import ExoticFruits from './ExoticFruits.jsx';
import Tea from './Tea.jsx';
import Ghee from './Ghee.jsx';
import Nandini from './Nandini.jsx';
import FreshVegetables from './FreshVegetables.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminRegistration from './components/AdminRegistration.jsx';
import AdminPanel from './AdminPanel.jsx';
import AddProduct from './components/AddProduct.jsx';
import EditProduct from './components/EditProduct.jsx';
import ManageUsers from './components/ManageUsers.jsx';
import ManageProducts from './components/ManageProducts.jsx';
import EditUserNameOrEmail from './components/EditUserNameOrEmail.jsx';
import AddToCart from './components/AddToCart.jsx';
import ProductView from './components/ProductView.jsx';
import CheckOut from './components/CheckOut.jsx';
import AdminOrders from './components/AdminOrders.jsx';
import PaymentSuccess from './components/checkout/PaymentSuccess.jsx';
import PaymentCancel from './components/checkout/PaymentCancel.jsx';
import ViewOrder from './components/ViewOrder.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  function isTokenExists() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {

  }, []);

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminRegister" element={<AdminRegistration />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:productId" element={<EditProduct />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/manageProducts" element={<ManageProducts />} />
        <Route path="/editUserNameOrEmail/:userId" element={<EditUserNameOrEmail />} />
        <Route path="/adminOrder" element={<AdminOrders />} />
        <Route path="/viewOrder/:id" element={<ViewOrder />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exoticfruits" element={<ExoticFruits />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/ghee" element={<Ghee />} />
        <Route path="/nandini" element={<Nandini />} />
        <Route path="/freshvegetables" element={<FreshVegetables />} />
        <Route path="/view/:productId" element={<ProductView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/addToCart" element={<AddToCart />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
      </Route>
    </Routes>
  );
}

export default App;