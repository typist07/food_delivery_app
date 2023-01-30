import React from "react";
import Helmet from "../components/Helmet/Helmet.jsx";
import DisplayRegister from "../features/authentication/register/DisplayRegister";

const Register = () => {
    return (
        <Helmet title="Signup">
            <DisplayRegister />
        </Helmet>
    );
};

export default Register;
