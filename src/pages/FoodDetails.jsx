import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet.jsx";
import DisplayFoodDetails from "../features/components/food-details/DisplayFoodDetails.jsx";

const FoodDetails = () => {
    return (
        <Helmet title="Product-details">
            <DisplayFoodDetails />
        </Helmet>
    );
};

export default FoodDetails;
