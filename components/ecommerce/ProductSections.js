import React, {useEffect, useState} from "react";
import {server} from "../../config/index";
import AllProduct from '../elements/FeaturedTab';
import Cat2Tab from '../elements/NewArrivalTab';
import Cat3Tab from '../elements/TrendingTab';
import Link from "next/link"
import {useProducts} from "../../src/api/catalog/products";
import {useSelector} from "react-redux";
import {getCompany} from "../../redux/features/company";
import {fetchSeller} from "../../redux/features/seller";

function ProductSections() {

    const company = useSelector(getCompany);
    const seller = useSelector(fetchSeller);

    console.log(company)

    let filter = {
        offset: 0,
        limit: 5,
        filter: {
            seller_id: seller?.id
        },
        company_id: company,
    };

    const {data: dataPopulars, isSuccess: popularIsSuccess} = useProducts(filter);

    const {data: dataNews, isSuccess: newsIsSuccess} = useProducts({...filter, offset: 5});

    const {data: allDiscound} = useProducts({...filter, offset: 10});

    const {data: allDiscountMonth} = useProducts({...filter, offset: 15});

    const [active, setActive] = useState("1");


    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Акции месяца</h3>
            </div>
            <div className="tab-content wow fadeIn animated">
                <div>
                    <div className="product-grid-4 row">
                        <AllProduct products={dataPopulars?.data ?? []}/>
                    </div>
                </div>
            </div>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Новинки</h3>
            </div>
            <div className="tab-content wow fadeIn animated">
                <div>
                    <div className="product-grid-4 row">
                        <AllProduct products={dataNews?.data ?? []}/>
                    </div>
                </div>
            </div>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Акции от производителя</h3>
            </div>
            <div className="tab-content wow fadeIn animated">
                <div>
                    <div className="product-grid-4 row">
                        <AllProduct products={allDiscountMonth?.data ?? []}/>
                    </div>
                </div>
            </div>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Все акции</h3>
            </div>
            <div className="tab-content wow fadeIn animated">
                <div>
                    <div className="product-grid-4 row">
                        <AllProduct products={allDiscound?.data ?? []}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductSections;
