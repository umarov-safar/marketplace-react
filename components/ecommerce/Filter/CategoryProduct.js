import {useRouter} from "next/router";
import {connect} from "react-redux";
import {updateProductCategory} from "../../../redux/action/productFiltersAction";
import {useCategories} from "../../../src/api/catalog/categories";
import {useEffect, useState} from "react";
import {getSeller} from "../../../util/util";
import Link from "next/link";

const CategoryProduct = ({subcategories}) => {
    const router = useRouter();

    const [seller, setSeller] = useState();

    useEffect(() => {
        return () => {
            setSeller(getSeller())
        };
    }, []);


    const selectCategory = (e, category) => {

    };


    return (
        <>

            {subcategories && (
                <ul>
                    <li onClick={(e) => selectCategory(e, "")}>
                        <a>Все</a>
                    </li>
                    {subcategories.map((item, i) => (
                        <li onClick={(e) => selectCategory(e, "jeans")}>
                            <Link href={`/categories/${item.id}`}>
                                <a>
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + item.images.mobile_url}`}
                                        alt={item.name}
                                    />
                                    {item.name}
                                </a>
                            </Link>
                            {/*<span className="count">30</span>*/}
                        </li>
                    ))}
                </ul>
            )}


        </>
    );
};

export default CategoryProduct;
