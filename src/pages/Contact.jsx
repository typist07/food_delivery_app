import React from "react";
import Helmet from "../components/Helmet/Helmet.jsx";
import CommonSection from "../components/common-section/CommonSection.jsx";
import DisplayContact from "../features/components/contact/DisplayContact.jsx";

const Contact = () => {
    return (
        <Helmet title="Contact">
            <CommonSection title="Contact Us" />
            <DisplayContact />
        </Helmet>
    )
};

export default Contact;
