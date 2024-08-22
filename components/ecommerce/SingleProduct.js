import Link from "next/link";
import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getSeller} from "../../util/util";
import {useCreateBaskets} from "../../src/api/baskets";
import {fetchCustomer} from "../../redux/features/customer";
import storage from "../../util/localStorage";
import {fetchSeller} from "../../redux/features/seller";

const SingleProduct = ({product}) => {

    const seller = useSelector(fetchSeller);
    const customer = useSelector(fetchCustomer);

    const {mutateAsync, isSuccess} = useCreateBaskets();


    const addToCart = async (product) => {
        let offer = product.offer

        const compId = storage.get('company_id')

        let basket = {
            seller_id: seller.id,
            items: [
                {
                    offer_id: offer.id,
                    qty: 1,
                    product_id: product?.id,
                }
            ]
        }

        if (compId) {
            basket.company_id = compId
        }

        try {
            let data = await mutateAsync(basket);
        } catch (err) {
            console.log(err.message)
        }
        // toast("Товар добавлено в корзине!");
    };

    const handleCompare = (product) => {
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        toast("Added to Wishlist !");
    };
    return (
        <>
            <div className="product-cart-wrap mb-30">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.id}`}
                        >
                            <a>
                                {product?.images[0] ? (
                                        <>
                                            <img
                                                className="default-img"
                                                src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + product?.images[0]?.url}`}
                                                alt={product.name}
                                            />
                                            <img
                                                className="hover-img"
                                                src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + product?.images[0]?.url}`}
                                                alt={product.name}
                                            />
                                        </>)
                                    : (<>
                                        <img
                                            className="default-img"
                                            src={`/no-image.png`}
                                            alt={product.name}
                                        />
                                    </>)
                                }
                            </a>
                        </Link>
                    </div>
                    {/*<div className="product-action-1">*/}
                    {/*    <a*/}
                    {/*        aria-label="Quick view"*/}
                    {/*        className="action-btn hover-up"*/}
                    {/*        data-bs-toggle="modal"*/}
                    {/*    >*/}
                    {/*        <i className="fi-rs-eye"></i>*/}
                    {/*    </a>*/}
                    {/*    <a*/}
                    {/*        aria-label="Add To Wishlist"*/}
                    {/*        className="action-btn hover-up"*/}
                    {/*    >*/}
                    {/*        <i className="fi-rs-heart"></i>*/}
                    {/*    </a>*/}
                    {/*    <a*/}
                    {/*        aria-label="Compare"*/}
                    {/*        className="action-btn hover-up"*/}
                    {/*    >*/}
                    {/*        <i className="fi-rs-shuffle"></i>*/}
                    {/*    </a>*/}
                    {/*</div>*/}

                    <div className="product-badges product-badges-position product-badges-mrg">
                        {/*{product.trending && <span className="hot">Hot</span>}*/}
                        {/*{product.created && <span className="new">New</span>}*/}
                        {/*{product.totalSell > 100 && (*/}
                        {/*    <span className="best">Best Sell</span>*/}
                        {/*)}*/}
                        {/*{product.discount.isActive && (*/}
                        {/*    <span className="sale">Sale</span>*/}
                        {/*)}*/}
                        {/*{product.discount.percentage >= 5 && (*/}
                        {/*    <span className="hot">*/}
                        {/*        {product.discount.percentage}%*/}
                        {/*    </span>*/}
                        {/*)}*/}
                    </div>
                </div>
                <div className="product-content-wrap">
                    <div className="product-category">
                        <Link href="/products.js">
                            <a>{product?.brand.name}</a>
                        </Link>
                    </div>
                    <h2>
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.id}`}
                        >
                            <a>{product.name}</a>
                        </Link>
                    </h2>

                    <div className="product-card-bottom">
                        <div className="product-price">
                            <span>{product.offer?.base_price} ₽</span>
                            {/*{product.offers?.map(item => {*/}
                            {/*    if (item.seller_id == seller?.id) {*/}
                            {/*        return <span key={item.seller_id}>{item.base_price} ₽</span>*/}
                            {/*    }*/}
                            {/*})}*/}
                            <span className="old-price">{product.oldPrice && `${product.oldPrice} ₽`}</span>
                        </div>
                        <div className="add-cart">
                            <a className="add m-2">
                                <i className="fi-rs-heart"></i>
                            </a>
                            <a
                                onClick={() => addToCart(product)}
                                className="add">
                                <i className="fi-rs-shopping-cart mr-5"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = {
    addToCart: () => {
    },
    addToCompare: () => {
    },
    addToWishlist: () => {
    },
    openQuickView: () => {
    },
};

export default SingleProduct;
