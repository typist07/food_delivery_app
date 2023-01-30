import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.jsx";
import { Container, Row, Col } from "reactstrap";
import FoodCategory from "../features/components/home/food-category/FoodCategory.jsx";
import ProductCard from "../features/components/product-card/ProductCard.jsx";
import Testimonial from "../features/components/home/testimonial/Testimonial.jsx";
import FeatureData from "../features/components/home/feature-data/FeatureData.jsx";
import WhyChooseUs from "../features/components/home/why-choose-us/WhyChooseUs.jsx";
import PopularFoods from "../features/components/home/popular-foods/PopularFoods.jsx";
import IntroHome from "../features/components/home/intro-home/IntroHome.jsx";
import { useGetProductsQuery } from "../features/redux/store.js";
import LoadingSpinner from "../components/spinner/LoadingSpinner.jsx";

const Home = () => {
    const { data, isFetching } = useGetProductsQuery();
    const [hotPizza, setHotPizza] = useState([]);

    useEffect(() => {
        const filteredPizza = data?.filter((item) => item.category === "Pizza");
        const slicePizza = filteredPizza?.slice(0, 4);
        setHotPizza(slicePizza);
    }, [data]);

    return (
        <Helmet title="Home">
            <IntroHome />
            <FoodCategory />
            <FeatureData />
            <PopularFoods />
            <WhyChooseUs />

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5 ">
                            <h2>Hot Pizza</h2>
                        </Col>
                        {isFetching ? <LoadingSpinner /> : hotPizza?.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <Testimonial />
        </Helmet>
    );
};

export default Home;
