import React from "react";
import CommonSection from "../components/common-section/CommonSection.jsx";
import DisplayCheckout from "../features/components/checkout/DisplayCheckout";
import Helmet from "../components/Helmet/Helmet.jsx";

const Checkout = () => {
    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout" />
            <DisplayCheckout />
        </Helmet >
    );
};

export default Checkout;
