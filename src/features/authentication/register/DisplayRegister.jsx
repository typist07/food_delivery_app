import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAuthMutation } from "../../redux/store";
import CommonSection from "../../../components/common-section/CommonSection";
import classes from './displayRegister.module.scss'
import { toast } from "react-toastify";

const DisplayRegister = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [registerAuth] = useRegisterAuthMutation()

    const changeInputHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await registerAuth(data)
            toast.success('User registered successfully')
            navigate('/login')
        } catch (err) {
            toast.error(`User registration failed ` + err.message)
        }
    };

    return (
        <>
            <CommonSection title="Signup" />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12" className="m-auto text-center">
                            <form className={`${classes.form} mb-5`} onSubmit={submitHandler}>
                                <div className={classes.form__group}>
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
                                        required
                                        value={data.password}
                                        onChange={(e) => changeInputHandler(e)}
                                    />
                                </div>
                                <button type="submit" className="addTOCart__btn">
                                    Sign Up
                                </button>
                            </form>
                            <Link to="/login" style={{ textDecoration: 'none' }}>Already have an account? Login</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default DisplayRegister;
