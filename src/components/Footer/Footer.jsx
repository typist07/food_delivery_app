import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import logo from "../../assets/images/res-logo.png";
import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="3" md="4" sm="6">
                        <div className=" footer__logo text-start">
                            <img src={logo} alt="logo" />
                            <h5>Pizza Express</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nesciunt pariatur accusamus
                            </p>
                        </div>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Delivery Time</h5>
                        <ListGroup className="deliver__time-list">
                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Everyday</span>
                                <p>10:00am - 11:00pm</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Contact</h5>
                        <ListGroup className="deliver__time-list">
                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Location:</span> Ahmedabad, iskcon-road, India
                            </ListGroupItem>
                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Phone: 01712345678</span>
                            </ListGroupItem>

                            <ListGroupItem className=" delivery__time-item border-0 ps-0">
                                <span>Email: pizzaexpress97@gmail.com</span>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="4" sm="6">
                        <h5 className="footer__title">Newsletter</h5>
                        <p>Please subscribe our newsletter</p>
                        <div className="newsletter">
                            <input type="email" placeholder="Enter your email" />
                            <span>
                                <i className="ri-send-plane-line"></i>
                            </span>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col lg="6" md="6">
                        <p className="copyright__text">
                            Copyright - 2023 All Rights
                            Reserved.
                        </p>
                    </Col>
                    <Col lg="6" md="6">
                        <div className="social__links d-flex align-items-center gap-4 justify-content-end">
                            <p className="m-0">Follow: </p>
                            <span style={{ cursor: 'pointer' }}>
                                <i className="ri-facebook-line"></i>
                            </span>

                            <span style={{ cursor: 'pointer' }}>
                                <i className="ri-twitter-line"></i>
                            </span>

                            <span style={{ cursor: 'pointer' }}>
                                <i className="ri-instagram-line"></i>
                            </span>

                            <span style={{ cursor: 'pointer' }}>
                                <i className="ri-youtube-line"></i>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer