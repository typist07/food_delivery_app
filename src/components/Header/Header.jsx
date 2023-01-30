import React, { useRef, useEffect, useMemo } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./header.scss";
import { useSelector } from "react-redux";
import { cartToggleActions, useGetCartItemsQuery } from "../../features/redux/store";

const nav__links = [
    {
        display: "Home",
        path: "/home",
    },
    {
        display: "Foods",
        path: "/foods",
    },
    {
        display: "Cart",
        path: "/cart",
    },
    {
        display: "Contact",
        path: "/contact",
    },
];

const Header = () => {
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const location = useLocation()

    const toggleMenu = () => {
        menuRef.current.classList.toggle("show__menu")
    };

    const toggleCart = () => {
        dispatch(cartToggleActions.toggle());
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef?.current?.classList?.add("header__shrink");
            } else {
                headerRef?.current?.classList?.remove("header__shrink");
            }
        });

        return () => window.removeEventListener("scroll", null);
    }, []);

    const { data: cartItems } = useGetCartItemsQuery()
    const totalQuantity = useMemo(() => cartItems?.reduce((quantity, item) => quantity + (item.quantity), 0), [cartItems])

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h5>Pizza Express</h5>
                    </div>

                    {/* ======= menu ======= */}
                    {isLoggedIn ? <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className={(navClass) =>
                                        (navClass.isActive && location.pathname !== '/login') ? "active__menu" : ""
                                    }
                                >
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div> : null}

                    {/* ======== nav right icons ========= */}
                    <div className="nav__right d-flex align-items-center gap-4">
                        {isLoggedIn ? <span className="cart__icon" onClick={toggleCart}>
                            <i className="ri-shopping-basket-line"></i>
                            <span className="cart__badge">{totalQuantity}</span>
                        </span> : null}

                        <span className="user">
                            <Link to="/login">
                                <i className="ri-user-line"></i>
                            </Link>
                        </span>

                        <span className="mobile__menu" onClick={toggleMenu}>
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
