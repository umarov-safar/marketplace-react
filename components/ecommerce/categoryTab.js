import React, {useEffect, useState} from "react";
import {server} from "../../config/index";
import AllProduct from '../elements/FeaturedTab';
import Cat2Tab from '../elements/NewArrivalTab';
import Cat3Tab from '../elements/TrendingTab';
import Link from "next/link"
import {useProducts} from "../../src/api/catalog/products";
import {getSeller} from "../../util/util";

function CategoryTab() {
    const [seller, setSeller] = useState();


    const {data, isSuccess, refetch} = useProducts({
        offset: 0,
        limit: 20,
        filter: {
            seller_id: seller?.id
        }
    }, {
        enabled: !!seller?.id
    });

    useEffect(() => {
        setSeller(getSeller());
    }, [])

    const [active, setActive] = useState("1");
    const [cat1, setCat1] = useState([]);
    const [cat2, setCat2] = useState([]);
    const [cat3, setCat3] = useState([]);


    const catPAll = async () => {
    };

    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Популярные</h3>
                <ul className="nav nav-tabs links" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "1" ? "nav-link active" : "nav-link"
                            }
                            onClick={catPAll}
                        >
                            Все
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "2" ? "nav-link active" : "nav-link"
                            }
                            onClick={() => {
                            }}
                        >
                            Избранное
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "3" ? "nav-link active" : "nav-link"
                            }
                            onClick={() => {
                            }}
                        >
                            Популярные
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={
                                active === "4" ? "nav-link active" : "nav-link"
                            }
                            onClick={() => {
                            }}
                        >
                            Новинки
                        </button>
                    </li>
                </ul>
            </div>

            <div className="tab-content wow fadeIn animated">
                <div
                    className={
                        active === "1"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <AllProduct products={data?.data ?? []}/>
                    </div>
                </div>

                <div
                    className={
                        active === "2"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <AllProduct products={cat1}/>
                    </div>
                </div>

                <div
                    className={
                        active === "3"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat3Tab products={cat2}/>
                    </div>
                </div>
                <div
                    className={
                        active === "4"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row">
                        <Cat2Tab products={cat3}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryTab;
