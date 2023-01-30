import React from "react";
import DisplayCart from "../features/components/cart/DisplayCart";
import CommonSection from "../components/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

const Cart = () => {
    return (
        <Helmet title="Cart">
            <CommonSection title="Your Cart" />
            <DisplayCart />
        </Helmet>
    );
};

export default Cart;
