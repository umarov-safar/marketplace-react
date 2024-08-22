import {connect, useSelector} from "react-redux";
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
import {fetchSeller} from "../redux/features/seller";


const Cart = () => {

    const [companyId, setCompanyId] = useState();
    const seller = useSelector(fetchSeller)

    const filter = {
        seller_id: seller.id
    }
    const {data: bData, isSuccess: bIsSuccess} = useBaskets(filter, {enabled: !!filter?.seller_id});
    const changeItemQty = useCreateBaskets();
    const deleteBasketItem = useDeleteBasketItem();
    const deleteBasket = useDeleteBasket();

    const basketProducts = [{name: "Tovar 1", id: 2}]

    useEffect(() => {
        setCompanyId(storage.get(COMPANY_ID_LOC))
    }, []);


    const changeItem = async (itemBasket, qty) => {
        qty = parseInt(qty);
        if (itemBasket.offer.qty >= qty) {
            let basket = {
                seller_id: seller.id,
                items: [
                    {
                        offer_id: itemBasket.offer.id,
                        qty: qty,
                        product_id: itemBasket.product.id,
                        from_cart: true
                    }
                ]
            }

            if (companyId) {
                basket.company_id = companyId
            }

            let data = await changeItemQty.mutateAsync(basket);
        } else {
            toast(`Количесто не может быть больше ${itemBasket.offer.qty}`)
        }

    }


    const deleteItemBasket = async (item) => {
        let data = {
            item_id: item.id,
            seller_id: bData?.data?.seller_id
        };

        if (companyId) {
            data.company_id = companyId
        }

        let deleted = await deleteBasketItem.mutateAsync();

        if (!deleted?.errors) {
            let a = basketProducts.filter(pr => pr.id != item.id)
        }
    }

    const onDeleteBasket = async () => {
        let data = {seller_id: seller?.id};

        if (companyId) {
            data.company_id = companyId
        }

        let response = await deleteBasket.mutateAsync(data)
        if (response) {
            console.log('deleted')
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
                                        <span className="text-brand">{2}</span>{" "}
                                        товара
                                    </h6>
                                </div>
                            </div>
                        </div>
                        {bIsSuccess && bData.data?.items.length > 0 && (
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
                                            {bData.data?.items.map((itemBasket, i) => (
                                                (
                                                    <tr key={i}>
                                                        <td className="image product-thumbnail">
                                                            <img
                                                                src={'/no-image.png'}
                                                            />
                                                        </td>

                                                        <td className="product-des product-name">
                                                            <h6 className="product-name">
                                                                <Link
                                                                    href={`/products/${itemBasket.product.id}`}>
                                                                    <a>
                                                                        {itemBasket.product.name}
                                                                    </a>
                                                                </Link>
                                                            </h6>
                                                        </td>
                                                        <td
                                                            className="price"
                                                            data-title="Price"
                                                        >
                                                            <h4 className="text-brand">
                                                                <span>{itemBasket.offer.base_price} ₽</span>
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
                                                                       onChange={(e) => changeItem(itemBasket, e.target.value)}
                                                                       defaultValue={itemBasket.qty}
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
                                                                {(itemBasket.offer.base_price * itemBasket.qty).toFixed(2)}
                                                            </h4>
                                                        </td>
                                                        <td
                                                            className="action"
                                                            data-title="Remove"
                                                        >
                                                            <a
                                                                onClick={() => {
                                                                    deleteItemBasket(itemBasket)
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
