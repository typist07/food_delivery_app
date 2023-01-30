import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSliceActions, useLoginAuthMutation } from "../../redux/store";
import CommonSection from "../../../components/common-section/CommonSection";
import classes from './displayLogin.module.scss'
import { toast } from 'react-toastify';

const DisplayLogin = () => {
    const dispatch = useDispatch()
    const { login, logout } = authSliceActions
    const [loginAuth] = useLoginAuthMutation()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const changeInputHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAuth(data).unwrap()
            dispatch(login(response?.accessToken));
            navigate('/home')
            toast.success('Logged In Successfully')
        } catch (err) {
            toast.error('Login failed ' + err.message)
        }
    };

    const logoutHandler = () => {
        dispatch(logout())
        toast.success('You are successfully logged out')
    }

    return (
        <>
            <CommonSection title={isLoggedIn ? 'Logout' : 'Login'} />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12" className="m-auto text-center">
                            <form className={`${classes.form} mb-5`} onSubmit={submitHandler}>
                                {!isLoggedIn ? <><div className={classes.form__group}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => changeInputHandler(e)}
                                        required
                                    />
                                </div>
                                    <div className={classes.form__group}>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            autoComplete="on"
                                            value={data.password}
                                            onChange={(e) => changeInputHandler(e)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="addTOCart__btn">
                                        Login
                                    </button>
                                </> :
                                    <button type="submit" className="addTOCart__btn" onClick={logoutHandler}>
                                        Logout
                                    </button>}
                            </form>
                            {!isLoggedIn && <Link to="/register" style={{ textDecoration: 'none' }}>
                                Don't have an account? Create an account
                            </Link>}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default DisplayLogin;
