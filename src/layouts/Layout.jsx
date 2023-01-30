import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer.jsx'
import Header from '../components/Header/Header.jsx'
import SideCart from '../components/side-cart/SideCart.jsx'

const Layout = () => {
    const showCart = useSelector((state) => state.cartUi.cartIsVisible);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const location = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [location.pathname])

    return (
        <div>
            <Header />
            {isLoggedIn && showCart && <SideCart />}
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout