import React from "react";
import Helmet from "../components/Helmet/Helmet.jsx";
import CommonSection from "../components/common-section/CommonSection.jsx";
import DisplayAllFoods from "../features/components/all-foods/DisplayAllFoods.jsx";

const AllFoods = () => {
    return (
        <Helmet title="All-Foods">
            <CommonSection title="All Foods" />
            <DisplayAllFoods />
        </Helmet >
    );
};

export default AllFoods;
