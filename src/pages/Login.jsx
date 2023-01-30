import React from "react";
import Helmet from "../components/Helmet/Helmet.jsx";
import DisplayLogin from "../features/authentication/login/DisplayLogin";

const Login = () => {
    return (
        <Helmet title="Login">
            <DisplayLogin />
        </Helmet>
    );
};

export default Login;
