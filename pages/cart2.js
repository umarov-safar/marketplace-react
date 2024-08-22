import {connect} from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import products from '/public/static/product.json';
import {useProducts} from "../src/api/catalog/products";
import {useBasketItems, useBaskets, useCreateBaskets, useDeleteBasket, useDeleteBasketItem} from "../src/api/baskets";
import React, {useEffect, useRef, useState} from "react";
import storage from "../util/localStorage";
import {CART_ITEMS, COMPANY_ID_LOC, SELLER_KEY_IN_LOC} from "../util/constants";
import {getSeller} from "../util/util";
import {toast} from "react-toastify";
import {apiClient} from "../src/api/apiClient";


const filter = {}

const Cart = () => {
    const [companyId, setCompanyId] = useState();
    const [seller, setSeller] = useState();
    const [items, setItems] = useState();
    const [basketProducts, setBasketProducts] = useState([]);
    const [products, setProducts] = useState([]);
    // get basket info of customer 
    const basket = useBaskets(filter, {enabled: !!filter?.seller_id});

    // get basket items(products)
    // const products = useBasketItems(items, {
    //     enabled: !!items,
    //     cacheTime: 0
    // });

    //delete basket item;
    const deleteBasketItem = useDeleteBasketItem();


    // delete basket all
    const deleteBasket = useDeleteBasket();


    // change item qty
    const changeItemQty = useCreateBaskets();


    // setting seller id and company id
    useEffect(() => {
        setSeller(storage.get(SELLER_KEY_IN_LOC));
        setCompanyId(storage.get(COMPANY_ID_LOC));
        filter.seller_id = storage.get(SELLER_KEY_IN_LOC).id
        filter.company_id = storage.get(COMPANY_ID_LOC)
    }, []);


    // fetch products in useEffect
    const fetchProducts = async (data) => {
        if (!(data?.length > 0)) return;
        let response = await apiClient.post('baskets/baskets/customer:basket-items', {data});
        setProducts(response.data)
    }

    // get items from basket and make array of objects like {product_id: n, offer_id: n} to get products
    useEffect(() => {
        if (basket.isSuccess) {
            let items = basket.data?.data?.items?.map(item => {
                return {
                    product_id: item.product_id,
                    offer_id: item.offer_id
                }
            });
            fetchProducts(items);
        }
    }, [basket.isSuccess, changeItemQty.isSuccess]);

    useEffect(() => {
        if (products?.length > 0) {
            let merged = products?.map(product => {
                let productItemInBasket = basket?.data?.data?.items?.find(item => item.product_id == product.id);
                return {...product, basketInfo: productItemInBasket}
            })
            setBasketProducts(merged);
        }
    }, [products])


    const onDeleteBasket = async () => {
        let response = await deleteBasket.mutateAsync({seller_id: seller?.id})
        if (response) {
            setBasketProducts([]);
        }
    }


    const deleteItemBasket = async (item) => {
        let deleted = await deleteBasketItem.mutateAsync({
            seller_id: item.basketInfo.seller_id,
            item_id: item.basketInfo.id,
            company_id: companyId
        });

        if (!deleted?.errors) {
            let a = basketProducts.filter(pr => pr.id != item.id)
            setBasketProducts(prev => prev.filter(pr => pr.id != item.id))
        }
    }


    const changeItem = async (product, qty) => {
        let offer = product.offers.find(i => i.id == product.basketInfo.offer_id);
        qty = parseInt(qty);
        if (offer.qty >= qty) {
            let basket = {
                seller_id: seller.id,
                items: [
                    {
                        offer_id: offer.id,
                        qty: qty,
                        product_id: product.id,
                        from_cart: true
                    }
                ]
            }
            let data = await changeItemQty.mutateAsync(basket);
        } else {
            toast(`Количесто не может быть больше ${offer.qty}`)
        }

    }

    return (
        <>
            <Layout parent="Главная" sub="Корзина">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mb-40">
                                <h1 className="heading-2 mb-10">Ваша корзина</h1>
                                <div className="d-flex justify-content-between">
                                    <h6 className="text-body">
                                        В вашей корзине{" "}
                                        <span className="text-brand">{basketProducts.length}</span>{" "}
                                        товара
                                    </h6>
                                </div>
                            </div>
                        </div>
                        {basketProducts.length > 0 && (
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="table-responsive shopping-summery">
                                        <table
                                            className={
                                                2
                                                    ? "table table-wishlist"
                                                    : "d-none"
                                            }
                                        >
                                            <thead>
                                            <tr className="main-heading">
                                                <th className="custome-checkbox start pl-30" colSpan="2">
                                                    Товары
                                                </th>
                                                <th scope="col">Цена за шт</th>
                                                <th scope="col">Количество</th>
                                                <th scope="col">Итог</th>
                                                <th scope="col" className="end">Удалить</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {console.log(basketProducts)}
                                            {basketProducts.length > 0 && basketProducts.map((product, i) => (
                                                (
                                                    <tr key={i}>
                                                        <td className="image product-thumbnail">
                                                            <img
                                                                src={'/no-image.png'}
                                                            />
                                                        </td>

                                                        <td className="product-des product-name">
                                                            <h6 className="product-name">
                                                                <Link href={`/products/${product.id}`}>
                                                                    <a>
                                                                        {product.name}
                                                                    </a>
                                                                </Link>
                                                            </h6>
                                                        </td>
                                                        <td
                                                            className="price"
                                                            data-title="Price"
                                                        >
                                                            <h4 className="text-brand">
                                                                <span>{product.offers[0].base_price} ₽</span>
                                                            </h4>
                                                        </td>
                                                        <td
                                                            className="text-center detail-info"
                                                            data-title="Stock"
                                                        >
                                                            <div className="detail-extralink mr-15">
                                                                <div className="border radius ">
                                                                <span className="qty-val">
                                                                <input type="number"
                                                                       onChange={(e) => changeItem(product, e.target.value)}
                                                                       defaultValue={product.basketInfo.qty}
                                                                       min={1}
                                                                />

                                                            </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className="text-right"
                                                            data-title="Cart"
                                                        >
                                                            <h4 className="text-body">
                                                                {(product.offers[0].base_price * product.basketInfo?.qty).toFixed(2)}
                                                            </h4>
                                                        </td>
                                                        <td
                                                            className="action"
                                                            data-title="Remove"
                                                        >
                                                            <a
                                                                onClick={() => {
                                                                    deleteItemBasket(product)
                                                                }}
                                                                className="text-muted"
                                                            >
                                                                <i className="fi-rs-trash"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-end"
                                                >
                                                    <a
                                                        onClick={onDeleteBasket}
                                                        className="text-muted"
                                                    >
                                                        <i className="fi-rs-cross-small"></i>
                                                        Удалить все
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart-action text-end">
                                        <a className="btn ">
                                            <i className="fi-rs-shopping-bag mr-10"></i>
                                            Купить
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </section>


            </Layout>
        </>
    );
};


export default Cart;
