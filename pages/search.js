import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import CategoryBreadcrumb from "../components/layout/CategoryBreadcrumb";
import VendorFilter from "./../components/ecommerce/Filter/VendorFilter";
import Pagination from "./../components/ecommerce/Pagination";
import SingleProduct from "./../components/ecommerce/SingleProduct";
import Layout from "./../components/layout/Layout";
import SortSelect from "../components/ecommerce/Filter/SortSelect";
import {useProducts} from "../src/api/catalog/products";
import CategoryProduct from "../components/ecommerce/Filter/CategoryProduct";
import {getSeller} from "../util/util";

const Search = ({productFilters}) => {

    let router = useRouter();
    const [seller, setSeller] = useState();
    const {data: dataProduct, isSuccess} = useProducts({
        filter: {
            name: router.query.search,
            seller_id: seller?.id
        }
    }, {
        enabled: !!seller?.id
    });


    useEffect(() => {
        setSeller(getSeller())
    }, [])


    return (
        <>
            <Layout noBreadcrumb="d-none">
                <section className="mt-50 mb-50">
                    <div className="container mb-30">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                                <div className="shop-product-fillter">
                                    {/*<div className="totall-product">*/}
                                    {/*    <p>*/}
                                    {/*        We found*/}
                                    {/*        <strong className="text-brand">*/}
                                    {/*            /!*{products.items.length}*!/*/}
                                    {/*        </strong>*/}
                                    {/*        items for you!*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}
                                    <div className="sort-by-product-area">
                                        <div className="sort-by-cover mr-10">
                                            {/*<ShowSelect*/}
                                            {/*    selectChange={selectChange}*/}
                                            {/*    showLimit={showLimit}*/}
                                            {/*/>*/}
                                        </div>
                                        <div className="sort-by-cover">
                                            <SortSelect/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-grid">
                                    {/*{getPaginatedProducts.length === 0 && (*/}
                                    {/*    <h3>No Products Found </h3>*/}
                                    {/*)}*/}

                                    {dataProduct?.data?.map((item, i) => (
                                        <div
                                            className="col-lg-3 col-md-4 col-12 col-sm-6"
                                            key={i}
                                        >
                                            <SingleProduct product={item}/>
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
                                        {/*<Pagination*/}
                                        {/*    getPaginationGroup={*/}
                                        {/*        getPaginationGroup*/}
                                        {/*    }*/}
                                        {/*    currentPage={currentPage}*/}
                                        {/*    pages={pages}*/}
                                        {/*    next={next}*/}
                                        {/*    prev={prev}*/}
                                        {/*    handleActive={handleActive}*/}
                                        {/*/>*/}
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                {/*<div className="sidebar-widget widget-category-2 mb-30">*/}
                                {/*    <h5 className="section-title style-1 mb-30">*/}
                                {/*        Категории*/}
                                {/*    </h5>*/}
                                {/*    <CategoryProduct/>*/}
                                {/*</div>*/}
                                <div className="sidebar-widget price_range range mb-30">
                                    <h5 className="section-title style-1 mb-30">Фильтр</h5>
                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <br/>
                                            {/*<PriceRangeSlider/>*/}
                                            <br/>
                                        </div>
                                    </div>
                                    <div className="list-group">
                                        <div className="list-group-item mb-10 mt-10">
                                            <label className="fw-900">
                                                Бренд
                                            </label>
                                            <VendorFilter/>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                                <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                                    <img
                                        src="/assets/imgs/banner/banner-11.png"
                                        alt=""
                                    />
                                    <div className="banner-text">
                                        <span>Oganic</span>
                                        <h4>
                                            Save 17% <br/>
                                            on{" "}
                                            <span className="text-brand">
                                                Oganic
                                            </span>
                                            <br/>
                                            Juice
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <WishlistModal /> */}
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                {/* <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <Search />
                        </div>
                        <div className="col-xl-6">
                            <SideBarIcons />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-6">
                            <CategoryProduct />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3">

                        </div>
                        <div className="col-md-9">





                        </div>
                    </div>
                </div> */}
            </Layout>
        </>
    );
};

export default Search;
