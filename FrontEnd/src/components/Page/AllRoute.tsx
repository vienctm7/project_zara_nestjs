import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Help from './Help'
import Footer from '../layout/Footer'
import  Navbar  from '../layout/Navbar'
import Login from './Login';
import Search from './Search';
import SignIn from './SignIn';
import Cart from './Cart';
import ProductPage from '../layout/ProductPage';
import SinglePage from '../layout/SinglePage';
import Inventory from '../Admin/Pages/Inventory';
import Orders from '../Admin/Pages/Orders';
import Customers from '../Admin/Pages/Customers';
import Dashboard from '../Admin/Pages/Dashbaord';
import ProtectedRoute from '../layout/ProtectedRoute'
import Checkout from '../layout/Checkout'
import PaymentMethod from '../layout/PaymentMethod'
import CardDetail from '../layout/CardDetail'
import AddProduct from '../Admin/Pages/AddProduct/AddProduct'



function AllRoute() {
  return (
    <Routes>
      <Route path="/addProduct" element={<AddProduct />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>}></Route>
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="/footer" element={<Footer />}></Route>
      <Route path="/navbar" element={<Navbar />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/signIn" element={<SignIn/>}></Route>
      <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
      <Route path="/products/details/:id" element={<SinglePage/>}></Route>
      <Route path="/products" element={<ProductPage/>}></Route>
      <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}></Route>
      <Route path="/paymentMethod" element={<ProtectedRoute><PaymentMethod/></ProtectedRoute>}></Route>
      <Route path="/fillcarddetail" element={<ProtectedRoute><CardDetail /></ProtectedRoute>}
      ></Route>
    </Routes>
  )
}

export default AllRoute