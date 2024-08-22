import React from "react";
import {useRouter} from 'next/router'
import Link from "next/link"
import Tags from "../ecommerce/Filter/Tags";

const CategoryBreadcrumb = ({category, parent, sub, subChild, noBreadcrumb}) => {
    const router = useRouter()

    return (
        <>
            <div className="page-header mt-30 mb-50">
                <div className="container">
                    <div className="archive-header">
                        <div className="row align-items-center">
                            <div className="col-xl-4">
                                <h1 className="mb-15 text-capitalize">{category?.name || "Category"}</h1>
                                <div className="breadcrumb">
                                    <Link href="/"><a rel="nofollow"><i
                                        className="fi-rs-home mr-5"></i>Категории</a></Link>
                                    <span></span> Shop <span></span>
                                </div>
                            </div>
                            {/*<div className="col-xl-9 text-end d-none d-xl-block">*/}
                            {/*    <Tags/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryBreadcrumb;
