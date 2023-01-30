import React from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import SideCartItem from "./SideCartItem";
import { useDispatch } from "react-redux";
import "./sideCart.scss";
import { useState } from "react";
import { useEffect } from "react";
import TotalAmount from "../../utils/TotalAmount";
import { cartToggleActions, useGetCartItemsQuery } from "../../features/redux/store";
import LoadingSpinner from "../spinner/LoadingSpinner";

const SideCart = () => {
    const { data, isFetching } = useGetCartItemsQuery()
    const [cartProducts, setCartProducts] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setCartProducts(data)
        }
    }, [data])

    const toggleCart = () => {
        dispatch(cartToggleActions.toggle());
    };

    const totalAmount = TotalAmount()

    return (
        <div className="cart__container">
            <ListGroup className="cart">
                <div className="cart__close">
                    <span onClick={toggleCart}>
                        <i className="ri-close-fill"></i>
                    </span>
                </div>

                <div className="cart__item-list">
                    {isFetching ? <LoadingSpinner /> : cartProducts?.length === 0 ? (
                        <h6 className="text-center mt-5">No item added to the cart</h6>
                    ) : (
                        cartProducts?.map((item, index) => (
                            <SideCartItem item={item} key={index} />
                        ))
                    )}
                </div>

                <div className="cart__bottom d-flex align-items-center justify-content-between">
                    <h6>
                        Subtotal : <span>${totalAmount}</span>
                    </h6>
                    {cartProducts?.length > 0 ? <button>
                        <Link to="/checkout" onClick={toggleCart}>
                            Checkout
                        </Link>
                    </button> : null}
                </div>
            </ListGroup>
        </div>
    );
};

export default SideCart;
