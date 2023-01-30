import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import AllFoods from '../pages/AllFoods.jsx'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import FoodDetails from '../pages/FoodDetails.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Contact from '../pages/Contact.jsx'
import Layout from '../layouts/Layout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import ErrorPage from '../pages/Error.jsx'
import { isTokenPresent } from '../features/redux/auth/authSlice.js'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={isTokenPresent ? <ErrorPage /> : <ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/foods" element={<AllFoods />} />
            <Route path="/foods/:id" element={<FoodDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
        </Route>
    </Route>
))

const Routers = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routers