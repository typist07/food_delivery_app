import React from "react";
import { ListGroupItem } from "reactstrap";
import { useDeleteItemFromCartMutation, useUpdateItemInCartMutation } from "../../features/redux/store";
import "./sideCartItem.scss";

const SideCartItem = ({ item }) => {
    const { title, price, image01, quantity } = item;

    const [updateItemInCart] = useUpdateItemInCartMutation({ fixedCacheKey: 'cart-item-add' })
    const [deleteItemFromCart] = useDeleteItemFromCartMutation()

    const incrementItem = async (item) => {
        await updateItemInCart({
            ...item,
            quantity: item.quantity + 1
        })
    };

    const decreaseItem = async (item) => {
        if (item.quantity > 1) {
            await updateItemInCart({
                ...item,
                quantity: item.quantity - 1
            })
        }
        else {
            await deleteItemFromCart(item.id)
        }
    };

    const deleteItem = async (item) => {
        await deleteItemFromCart(item.id)
    };

    return (
        <ListGroupItem className="border-0 cart__item">
            <div className="cart__item-info d-flex gap-2">
                <img src={image01} alt="product-img" />

                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div>
                        <h6 className="cart__product-title">{title}</h6>
                        <p className=" d-flex align-items-center gap-5 cart__product-price">
                            {quantity}x <span>${price}</span>
                        </p>
                        <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                            <span className="increase__btn" onClick={() => incrementItem(item)}>
                                <i className="ri-add-line"></i>
                            </span>
                            <span className="quantity">{quantity}</span>
                            <span className="decrease__btn" onClick={() => decreaseItem(item)}>
                                <i className="ri-subtract-line"></i>
                            </span>
                        </div>
                    </div>

                    <span className="delete__btn" onClick={() => deleteItem(item)}>
                        <i className="ri-close-line"></i>
                    </span>
                </div>
            </div>
        </ListGroupItem>
    );
};

export default SideCartItem;
