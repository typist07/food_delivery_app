import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import TotalAmount from "../../../utils/TotalAmount";
import "./displayCheckout.scss";

const regExName = /^([a-zA-Z]{2,20}\s?)+$/;
const regExEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regExNumber = /^\d{10}$/;
const regExCity = /^[a-zA-Z]+([\s-]+)?[a-zA-Z]+$/;
const regExPinCode = /^\d{6}$/;
const regExAddress = /^\w+([,-.\s+]+)?\w+(([,-.\s+]+)?\w+(\s+)?)+$/;

const initialState = {
    name: '',
    email: '',
    number: '',
    city: '',
    pinCode: '',
    address: '',
    errorMessage: ''
}

const DisplayCheckout = () => {
    const cartTotalAmount = TotalAmount()
    const [data, setData] = useState(initialState)
    const inputTypes = [
        {
            type: 'text', name: 'name', value: data.name, placeholder: 'Enter your name',
            pattern: "^([a-zA-Z]{2,20}\\s?)+$", error: 'Username should be 2-20 characters and should not include any special characters'
        },
        {
            type: 'text', name: 'email', value: data.email, placeholder: 'Enter your email',
            pattern: '^\\w+([\\.-]?\\w+)@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', error: 'Please enter valid Email address!'
        },
        {
            type: 'text', name: 'number', value: data.number, placeholder: 'Enter your phone number',
            pattern: '^\\d{10}$', error: 'Phone number should be of 10 digits only!'
        },
        {
            type: 'text', name: 'city', value: data.city, placeholder: 'Enter your city name',
            pattern: "^[a-zA-Z]+([\\s-]+)?[a-zA-Z]+$", error: 'Please enter valid city!'
        },
        {
            type: 'text', name: 'pinCode', value: data.pinCode, placeholder: 'Enter your pin code',
            pattern: "^\\d{6}$", error: 'Please enter valid pincode (6-digits) only!'
        },
        {
            type: 'textarea', name: 'address', value: data.address, placeholder: 'Enter your address',
            pattern: "^\\w+([,-.\\s+]+)?\\w+(([,-.\\s+]+)?\\w+(\\s+)?)+$", error: 'Please enter valid address!'
        }
    ]

    const isNameValid = regExName.test(data.name)
    const isEmailValid = regExEmail.test(data.email)
    const isNumberValid = regExNumber.test(data.number)
    const isCityValid = regExCity.test(data.city)
    const isPinCodeValid = regExPinCode.test(data.pinCode)
    const isAddressValid = regExAddress.test(data.address)
    const allInputsValid = isNameValid && isEmailValid && isNumberValid && isCityValid && isPinCodeValid && isAddressValid;

    const shippingInfo = [];
    const shippingCost = 45;
    const totalShippingAmount = (cartTotalAmount ? cartTotalAmount : 0) + shippingCost;

    const submitHandler = (e) => {
        e.preventDefault();
        shippingInfo.push(data, totalShippingAmount);
        toast.success('Your order has been placed successfully and will delivered in 30 minutes')
        setData(initialState)
        console.log(shippingInfo);
    };

    const inputChangeHandler = (e) => {
        setData((input) => ({ ...input, [e.target.name]: e.target.value }))
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" md="6">
                        <h6 className="mb-4">Shipping Address</h6>
                        <form className="checkout__form" onSubmit={submitHandler}>
                            {inputTypes.map(({ type, name, value, placeholder, pattern, error }, index) => (
                                <div className="form__group" key={index}>
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        name={name}
                                        value={value}
                                        pattern={pattern}
                                        error={error}
                                        required
                                        onChange={(e) => inputChangeHandler(e)}
                                    />
                                    <p style={{ color: 'red' }}>{error}</p>
                                </div>
                            )
                            )}
                            <button type="submit" className={allInputsValid ? "addTOCart__btn" : ''} disabled={!allInputsValid}>
                                Payment
                            </button>
                        </form>
                    </Col>

                    <Col lg="4" md="6">
                        <div className="checkout__bill">
                            <h6 className="d-flex align-items-center justify-content-between mb-3">
                                Subtotal: <span>${cartTotalAmount}</span>
                            </h6>
                            <h6 className="d-flex align-items-center justify-content-between mb-3">
                                Shipping: <span>${shippingCost}</span>
                            </h6>
                            <div className="checkout__total">
                                <h5 className="d-flex align-items-center justify-content-between">
                                    Total: <span>${totalShippingAmount}</span>
                                </h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DisplayCheckout;
