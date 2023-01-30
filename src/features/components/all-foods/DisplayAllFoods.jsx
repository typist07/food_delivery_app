import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { useGetProductsQuery } from "../../redux/store";
import ProductCard from "../product-card/ProductCard";
import './displayAllFoods.scss'

const DisplayAllFoods = () => {
    const { data, isFetching } = useGetProductsQuery()
    const [sortProducts, setSortProducts] = useState()
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [searchedProduct, setSearchedProduct] = useState()

    useEffect(() => {
        setSortProducts(data)
    }, [data])

    // ************************************** pagination & searchProducts *************************************
    const productsPerPage = 8;
    const lastPostIndex = pageNumber * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage
    const pageCount = Math.ceil(data?.length / productsPerPage);

    useEffect(() => {
        if (searchTerm?.length) {
            setSearchedProduct(sortProducts?.filter((item) => {
                if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) return item;
                return ''
            }))
        } else {
            setSearchedProduct(sortProducts?.map((item) => item))
        }
    }, [data, sortProducts, searchTerm])

    useEffect(() => {
        if (!searchTerm && searchedProduct?.length === sortProducts?.length && sortProducts?.length < data?.length) {
            setSortProducts(data)
        }

    }, [searchTerm, searchedProduct, sortProducts, data])

    // ******************************************* sortproducts **********************************************
    const sortDisplayPageItems = (val) => {
        const sortData = (a, b) => {
            if (val === 'asc' || val === 'desc') {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
            }
            else if (val === 'high-price' || val === 'low-price') {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1
                }
            }
            else {
                return 0;
            }
        }

        let sortItems = searchedProduct?.sort(sortData)
        switch (val) {
            case 'asc':
                setSortProducts(sortItems)
                break;
            case 'desc':
                setSortProducts(sortItems.reverse())
                break;
            case 'low-price':
                setSortProducts(sortItems)
                break;
            case 'high-price':
                setSortProducts(sortItems.reverse())
                break;
            default:
                setSortProducts(data)
        }

    }

    const changePageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= pageCount && selectedPage !== pageNumber)
            setPageNumber(selectedPage)
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="6" md="6" sm="6" xs="4">
                        <div className="search__widget d-flex align-items-center justify-content-between ">
                            <input
                                type="text"
                                placeholder="I'm looking for...."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span>
                                <i className="ri-search-line"></i>
                            </span>
                        </div>
                    </Col>
                    <Col lg="6" md="6" sm="6" xs="8" className="mb-5">
                        <div className="sorting__widget text-end">
                            <select className="w-50" onChange={(e) => sortDisplayPageItems(e.target.value)}>
                                <option value="def">Default</option>
                                <option value="asc">Alphabetically, A-Z</option>
                                <option value="desc">Alphabetically, Z-A</option>
                                <option value="high-price">High Price</option>
                                <option value="low-price">Low Price</option>
                            </select>
                        </div>
                    </Col>

                    {isFetching ? <LoadingSpinner /> : searchedProduct?.slice(searchTerm?.length ? 0 : firstPostIndex, lastPostIndex).map((item) => (
                        <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                            <ProductCard item={item} />
                        </Col>
                    ))}

                    {searchedProduct?.length > 0 &&
                        <div className="pagination">
                            <button className={pageNumber > 1 ? "" : "pagination__disable"} onClick={() => changePageHandler(pageNumber - 1)}>◀</button>
                            {
                                [...Array(pageCount)].map((_, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={pageNumber === (i + 1) ? 'page__selected' : ''}
                                            onClick={() => changePageHandler(i + 1)}>
                                            {i + 1}
                                        </button>)
                                })
                            }
                            <button className={pageNumber < pageCount ? "" : "pagination__disable"} onClick={() => changePageHandler(pageNumber + 1)}>▶</button>
                        </div>}
                </Row>
            </Container>
        </section>
    )
}

export default DisplayAllFoods