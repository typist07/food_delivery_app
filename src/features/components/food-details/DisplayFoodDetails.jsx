import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import CommonSection from '../../../components/common-section/CommonSection';
import { useAddItemToCartMutation, useGetCartItemsQuery, useGetProductsQuery, useUpdateItemInCartMutation } from '../../redux/store';
import ProductCard from '../product-card/ProductCard';
import './displayFoodDetails.scss'

const DisplayFoodDetails = () => {
    const { id } = useParams();
    const { data } = useGetProductsQuery()
    const [tab, setTab] = useState("desc");
    const { data: cartItems } = useGetCartItemsQuery()
    const [addItemToCart] = useAddItemToCartMutation()
    const [updateItemInCart] = useUpdateItemInCartMutation()

    const [product, setProduct] = useState([])
    const [previewImg, setPreviewImg] = useState(product?.image01);

    useEffect(() => {
        if (data) {
            const item = data?.find((product) => product.id === id);
            setProduct(item)
        }
    }, [data, id])

    const { title, price, category, desc } = product

    const relatedProduct = data?.filter((item) => item.category === category);

    const addItem = async (item) => {
        const existingItem = cartItems?.find((e) => e.id === item.id);
        if (!existingItem) {
            await addItemToCart({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: 1,
                image01: item.image01
            })
        }
        else {
            await updateItemInCart({
                ...existingItem,
                quantity: existingItem.quantity + 1
            })
        }
    };

    useEffect(() => {
        setPreviewImg(product?.image01);
    }, [product]);

    return (
        <>
            <CommonSection title={title} />
            <section>
                <Container>
                    <Row>
                        <Col lg="2" md="2">
                            <div className="product__images ">
                                <div
                                    className="img__item mb-3"
                                    onClick={() => setPreviewImg(product?.image01)}
                                >
                                    <img src={product.image01} alt="" className="w-50" />
                                </div>
                                <div
                                    className="img__item mb-3"
                                    onClick={() => setPreviewImg(product?.image02)}
                                >
                                    <img src={product.image02} alt="" className="w-50" />
                                </div>

                                <div
                                    className="img__item"
                                    onClick={() => setPreviewImg(product?.image03)}
                                >
                                    <img src={product.image03} alt="" className="w-50" />
                                </div>
                            </div>
                        </Col>

                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                <img src={previewImg} alt="" className="w-100" />
                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{title}</h2>
                                <p className="product__price">
                                    {" "}
                                    Price: <span>${price}</span>
                                </p>
                                <p className="category mb-5">
                                    Category: <span>{category}</span>
                                </p>

                                <button onClick={() => addItem(product)} className="addTOCart__btn">
                                    Add to Cart
                                </button>
                            </div>
                        </Col>

                        <Col lg="12">
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6
                                    className={` ${tab === "desc" ? "tab__active" : ""}`}
                                    onClick={() => setTab("desc")}
                                >
                                    Description
                                </h6>
                                <h6
                                    className={` ${tab === "rev" ? "tab__active" : ""}`}
                                    onClick={() => setTab("rev")}
                                >
                                    Review
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className="tab__content">
                                    <p>{desc}</p>
                                </div>
                            ) : (
                                <div className="tab__form mb-3">
                                    <div className="review pt-5">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">Great product!!</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">Venice David</p>
                                        <p className="user__email">vdavid1289@gmail.com</p>
                                        <p className="feedback__text">Tasteful product!!</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">kate Cross</p>
                                        <p className="user__email">katecross199@gmail.com</p>
                                        <p className="feedback__text">Healthy product...</p>
                                    </div>
                                </div>
                            )}
                        </Col>

                        <Col lg="12" className="mb-5 mt-4">
                            <h2 className="related__Product-title">You might also like</h2>
                        </Col>

                        {relatedProduct?.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default DisplayFoodDetails