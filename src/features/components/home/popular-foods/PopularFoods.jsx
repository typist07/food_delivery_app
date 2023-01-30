import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProductCard from '../../product-card/ProductCard'
import './popularFoods.scss'
import foodCategoryImg01 from "../../../../assets/images/hamburger.png";
import foodCategoryImg02 from "../../../../assets/images/pizza.png";
import foodCategoryImg03 from "../../../../assets/images/bread.png";
import { useGetProductsQuery } from '../../../redux/store';
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner';

const PopularFoods = () => {
    const { data, isFetching } = useGetProductsQuery();
    const [category, setCategory] = useState("ALL");
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        setAllProducts(data)
    }, [data])

    const setFoodCategory = (category) => {
        setCategory(category)
        switch (category) {
            case 'BURGER':
                setAllProducts(data?.filter((item) => item.category === 'Burger'))
                break;
            case 'PIZZA':
                setAllProducts(data?.filter((item) => item.category === 'Pizza'))
                break;
            case 'BREAD':
                setAllProducts(data?.filter((item) => item.category === 'Bread'))
                break;
            default:
                setAllProducts(data)
                break;
        }
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="text-center">
                        <h2>Popular Foods</h2>
                    </Col>

                    <Col lg="12">
                        <div className="food__category d-flex align-items-center justify-content-center gap-4">
                            <button
                                className={`all__btn  ${category === "ALL" ? "foodBtnActive" : ""
                                    } `}
                                onClick={() => setFoodCategory("ALL")}
                            >
                                All
                            </button>
                            <button
                                className={`d-flex align-items-center gap-2 ${category === "BURGER" ? "foodBtnActive" : ""
                                    } `}
                                onClick={() => setFoodCategory("BURGER")}
                            >
                                <img src={foodCategoryImg01} alt="" />
                                Burger
                            </button>

                            <button
                                className={`d-flex align-items-center gap-2 ${category === "PIZZA" ? "foodBtnActive" : ""
                                    } `}
                                onClick={() => setFoodCategory("PIZZA")}
                            >
                                <img src={foodCategoryImg02} alt="" />
                                Pizza
                            </button>

                            <button
                                className={`d-flex align-items-center gap-2 ${category === "BREAD" ? "foodBtnActive" : ""
                                    } `}
                                onClick={() => setFoodCategory("BREAD")}
                            >
                                <img src={foodCategoryImg03} alt="" />
                                Bread
                            </button>
                        </div>
                    </Col>

                    {isFetching ? <LoadingSpinner /> : (allProducts)?.map((item) => (
                        <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default PopularFoods