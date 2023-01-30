import React, { useEffect, useState } from "react";
import "./displayCart.scss";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import TotalAmount from "../../../utils/TotalAmount";
import { useDeleteItemFromCartMutation, useGetCartItemsQuery } from "../../redux/store";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { toast } from "react-toastify";

const DisplayCart = () => {
    const { data, isFetching } = useGetCartItemsQuery()
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        if (data) {
            setCartItems(data)
        }
    }, [data])

    const totalAmount = TotalAmount()

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {isFetching ? <LoadingSpinner /> : cartItems?.length === 0 ? (
                            <h5 className="text-center">Your cart is empty</h5>
                        ) : (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((item) => (
                                        <CartTable item={item} key={item.id} />
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div className="mt-4">
                            <h6>
                                Subtotal:
                                $<span className="cart__subtotal">{totalAmount}</span>
                            </h6>
                            <p>Taxes and shipping will calculate at checkout</p>
                            <div className="cart__page-btn">
                                <button className="addTOCart__btn me-4">
                                    <Link to="/foods">Continue Shopping</Link>
                                </button>
                                {cartItems?.length > 0 ? <button className="addTOCart__btn">
                                    <Link to="/checkout">Proceed to checkout</Link>
                                </button> : null}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const CartTable = (props) => {
    const { id, image01, title, price, quantity } = props.item;
    const [deleteItemFromCart] = useDeleteItemFromCartMutation()
    const deleteItem = async () => {
        try {
            await deleteItemFromCart(id).unwrap()
            toast.success('Item deleted successfully')
        } catch (err) {
            toast.error('Item delete Fail ' + err.message)
        }
    };
    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={image01} alt="" />
            </td>
            <td className="text-center">{title}</td>
            <td className="text-center">${price}</td>
            <td className="text-center">{quantity}x</td>
            <td className="text-center cart__item-del">
                <i className="ri-delete-bin-line" onClick={deleteItem}></i>
            </td>
        </tr>
    );
};

export default DisplayCart;
