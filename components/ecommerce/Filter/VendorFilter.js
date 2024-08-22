import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {updateProductFilters} from "../../../redux/action/productFiltersAction";
import CheckBox from "./Checkbox";
import {useBrands} from "../../../src/api/brands";

const VendorFilter = () => {

    const {data, isSuccess} = useBrands({})

    const Router = useRouter();
    const searchTerm = Router.query.search;

    return (
        <>
            {isSuccess && (
                <div className="custome-checkbox">
                    <CheckBox
                        heading="Select Size"
                        filters={data?.data?.map((item) => {
                            return {value: item.name}
                        })}
                        handleCheckBox={(e) => {
                        }}
                    />
                </div>
            )}
        </>
    );
};


export default VendorFilter;
