import React from "react";
import "./productCard.scss";
import { Link } from "react-router-dom";
import { useAddItemToCartMutation, useGetCartItemsQuery, useUpdateItemInCartMutation } from "../../redux/store";
import { toast } from "react-toastify";

const ProductCard = (props) => {
    const { id, title, image01, price } = props.item;
    const { data } = useGetCartItemsQuery()

    const [addItemToCart] = useAddItemToCartMutation({ fixedCacheKey: 'cart-item-add' })
    const [updateItemInCart] = useUpdateItemInCartMutation()

    const addToCart = async (item) => {
        const existingItem = data?.find((e) => e.id === item.id);
        if (!existingItem) {
            await addItemToCart({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: 1,
                image01: item.image01,
            })
        }
        else {
            await updateItemInCart({
                ...existingItem,
                quantity: existingItem.quantity + 1
            })
        }
        toast.success('Item added Successfully')
    };

    return (
        <div className="product__item">
            <div className="product__img">
                <Link to={`/foods/${id}`}><img src={image01} alt="product-img" className="w-50" /></Link>
            </div>

            <div className="product__content">
                <h5>
                    <Link to={`/foods/${id}`}>{title}</Link>
                </h5>
                <div className=" d-flex align-items-center justify-content-between ">
                    <span className="product__price">${price}</span>
                    <button className="addTOCart__btn" onClick={() => addToCart(props.item)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
