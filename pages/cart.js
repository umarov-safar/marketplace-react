import {connect} from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import products from '/public/static/product.json';
import {useProducts} from "../src/api/catalog/products";
import {useBasketItems, useBaskets, useCreateBaskets, useDeleteBasketItem, useDeleteCart} from "../src/api/baskets";
import React, {useEffect, useRef, useState} from "react";
import storage from "../util/localStorage";
import {CART_ITEMS} from "../util/constants";
import {getSeller} from "../util/util";
import {toast} from "react-toastify";

const Cart = () => {


    const cartRef = useRef();
    const [seller, setSeller] = useState();
    const [items, setItems] = useState(false);

    // get customer's basket
    const {
        data: basketItems,
        isSuccess: isSuccessBasket,
        refetch: refetchBasketItems
    } = useBaskets({seller_id: seller?.id}, {
        enabled: !!seller
    });

    // get products by product_id and offer_id
    const {data: products, isSuccess: productsSuccess, refetch: refetchItems} = useBasketItems(items, {
        enabled: !!items,
        cacheTime: 0
    });

    // delete item from basket
    const {mutateAsync: deleteBasketItem, isSuccess: deletedBaskItemCart} = useDeleteBasketItem();

    // delete all item from basket
    const {data: deletedData, isSuccess: isDeleted, mutateAsync} = useDeleteCart();

    // change item quantity in input
    const {mutateAsync: changeItemQty, isSuccess: isChanged} = useCreateBaskets();

    useEffect(() => {
        setSeller(getSeller())
    }, [])

    useEffect(() => {
        if (basketItems?.data.items && basketItems?.data.items.length > 0) {
            let dataItems = basketItems?.data.items.map(item => {
                return {product_id: item.product_id, offer_id: item.offer_id, qty: item.qty}
            })
            setItems(dataItems);
        } else {
            setItems(false);
        }
    }, [isSuccessBasket, isDeleted, deletedBaskItemCart])

    const deleteCart = async () => {
        let data = await mutateAsync({seller_id: seller.id})
        cartRef.current.remove();
        setItems(false)
    }

    const deleteItemCart = async (item) => {
        let deleted = await deleteBasketItem({
            seller_id: item.seller_id,
            item_id: item.id
        })
        items.pop()
        setItems(items);
    }

    const changeItem = async (product, qty) => {
        let basketItem = items.find(i => i.product_id == product.id);
        let offer = product.offers.find(i => i.id == basketItem.offer_id);
        qty = parseInt(qty);
        if (offer.qty >= qty) {
            let basket = {
                seller_id: seller.id,
                items: [
                    {
                        offer_id: offer.id,
                        qty: qty,
                        product_id: product?.id,
                        from_cart: true
                    }
                ]
            }
            let data = await changeItemQty(basket);
        } else {
            toast(`Количесто не может быть больше ${offer.qty}`)
        }

    }

    return (
        <>
            <Layout parent="Главная" sub="Товары" subChild="Корзина">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mb-40">
                                <h1 className="heading-2 mb-10">Ваша корзина</h1>
                                <div className="d-flex justify-content-between">
                                    <h6 className="text-body">
                                        В вашей корзине{" "}
                                        <span className="text-brand">{items && items.length || 0}</span>{" "}
                                        товара
                                    </h6>
                                    {products?.data?.length && (
                                        <h6
                                            className="text-body">
                                            <a
                                                onClick={deleteCart}
                                                href="#" className="text-muted">
                                                <i className="fi-rs-trash mr-5"></i>
                                                Удалить все
                                            </a>
                                        </h6>
                                    )}

                                </div>
                            </div>
                        </div>
                        {productsSuccess && (
                            <div className="row" ref={cartRef}>
                                <div className="col-lg-8">
                                    <div className="table-responsive shopping-summery">
                                        <table
                                            className={
                                                products.data.length > 0
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
                                            {products?.data.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="image product-thumbnail">
                                                        <img
                                                            src={'/no-image.png'}
                                                        />
                                                    </td>

                                                    <td className="product-des product-name">
                                                        <h6 className="product-name">
                                                            <Link href="/products">
                                                                <a>
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                        </h6>
                                                    </td>
                                                    <td
                                                        className="price"
                                                        data-title="Price"
                                                    >
                                                        <h4 className="text-brand">
                                                            <span>{item?.offers[0]?.base_price} ₽</span>
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
                                                                       onChange={(e) => changeItem(item, e.target.value)}
                                                                       defaultValue={items && items?.map(i => i.product_id == item.id && i.qty)}/>

                                                            </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="text-right"
                                                        data-title="Cart"
                                                    >
                                                        <h4 className="text-body">
                                                            {basketItems?.data.items && basketItems?.data.items?.map(i => i.product_id == item.id && i.qty * item?.offers[0].base_price)}
                                                        </h4>
                                                    </td>
                                                    <td
                                                        className="action"
                                                        data-title="Remove"
                                                    >
                                                        <a
                                                            onClick={() => {
                                                                deleteItemCart(basketItems?.data.items?.find(i => i.product_id == item.id))
                                                            }}
                                                            className="text-muted"
                                                        >
                                                            <i className="fi-rs-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-end"
                                                >
                                                    {products.data.length > 0 && (
                                                        <a
                                                            onClick={deleteCart}
                                                            className="text-muted"
                                                        >
                                                            <i className="fi-rs-cross-small"></i>
                                                            Удалить все
                                                        </a>
                                                    )}
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
                                    {/*<div className="divider center_icon mt-50 mb-50">*/}
                                    {/*    <i className="fi-rs-fingerprint"></i>*/}
                                    {/*</div>*/}
                                    {/*<div className="row mb-50">*/}
                                    {/*    <div className="col-lg-6 col-md-12">*/}
                                    {/*        <div className="heading_s1 mb-3">*/}
                                    {/*            <h4>Calculate Shipping</h4>*/}
                                    {/*        </div>*/}
                                    {/*        <p className="mt-15 mb-30">*/}
                                    {/*            Flat rate:*/}
                                    {/*            <span className="font-xl text-brand fw-900">*/}
                                    {/*            5%*/}
                                    {/*        </span>*/}
                                    {/*        </p>*/}
                                    {/*        <form className="field_form shipping_calculator">*/}
                                    {/*            <div className="form-row">*/}
                                    {/*                <div className="form-group col-lg-12">*/}
                                    {/*                    <div className="custom_select">*/}
                                    {/*                        <select className="form-control select-active">*/}
                                    {/*                            <option value="AX">*/}
                                    {/*                                Aland Islands*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AF">*/}
                                    {/*                                Afghanistan*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AL">*/}
                                    {/*                                Albania*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="DZ">*/}
                                    {/*                                Algeria*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AD">*/}
                                    {/*                                Andorra*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AO">*/}
                                    {/*                                Angola*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AI">*/}
                                    {/*                                Anguilla*/}
                                    {/*                            </option>*/}
                                    {/*                            <option value="AQ">*/}
                                    {/*                                Antarctica*/}
                                    {/*                            </option>*/}
                                    {/*                        </select>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="form-row row">*/}
                                    {/*                <div className="form-group col-lg-6">*/}
                                    {/*                    <input*/}
                                    {/*                        required="required"*/}
                                    {/*                        placeholder="State / Country"*/}
                                    {/*                        name="name"*/}
                                    {/*                        type="text"*/}
                                    {/*                    />*/}
                                    {/*                </div>*/}
                                    {/*                <div className="form-group col-lg-6">*/}
                                    {/*                    <input*/}
                                    {/*                        required="required"*/}
                                    {/*                        placeholder="PostCode / ZIP"*/}
                                    {/*                        name="name"*/}
                                    {/*                        type="text"*/}
                                    {/*                    />*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="form-row">*/}
                                    {/*                <div className="form-group col-lg-12">*/}
                                    {/*                    <button className="btn  btn-sm">*/}
                                    {/*                        <i className="fi-rs-shuffle mr-10"></i>*/}
                                    {/*                        Update*/}
                                    {/*                    </button>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </form>*/}
                                    {/*        <div className="mb-30 mt-50">*/}
                                    {/*            <div className="heading_s1 mb-3">*/}
                                    {/*                <h4>Apply Coupon</h4>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="total-amount">*/}
                                    {/*                <div className="left">*/}
                                    {/*                    <div className="coupon">*/}
                                    {/*                        <form*/}
                                    {/*                            action="#"*/}
                                    {/*                            target="_blank"*/}
                                    {/*                        >*/}
                                    {/*                            <div className="form-row row justify-content-center">*/}
                                    {/*                                <div className="form-group col-lg-6">*/}
                                    {/*                                    <input*/}
                                    {/*                                        className="font-medium"*/}
                                    {/*                                        name="Coupon"*/}
                                    {/*                                        placeholder="Enter Your Coupon"*/}
                                    {/*                                    />*/}
                                    {/*                                </div>*/}
                                    {/*                                <div className="form-group col-lg-6">*/}
                                    {/*                                    <button className="btn  btn-sm">*/}
                                    {/*                                        <i className="fi-rs-label mr-10"></i>*/}
                                    {/*                                        Apply*/}
                                    {/*                                    </button>*/}
                                    {/*                                </div>*/}
                                    {/*                            </div>*/}
                                    {/*                        </form>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-lg-6 col-md-12">*/}
                                    {/*        <div className="border p-md-4 p-30 border-radius cart-totals">*/}
                                    {/*            <div className="heading_s1 mb-3">*/}
                                    {/*                <h4>Cart Totals</h4>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="table-responsive">*/}
                                    {/*                <table className="table">*/}
                                    {/*                    <tbody>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td className="cart_total_label">*/}
                                    {/*                            Cart Subtotal*/}
                                    {/*                        </td>*/}
                                    {/*                        <td className="cart_total_amount">*/}
                                    {/*                            <span className="font-lg fw-900 text-brand">*/}
                                    {/*                                233*/}
                                    {/*                            </span>*/}
                                    {/*                        </td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td className="cart_total_label">*/}
                                    {/*                            Shipping*/}
                                    {/*                        </td>*/}
                                    {/*                        <td className="cart_total_amount">*/}
                                    {/*                            <i className="ti-gift mr-5"></i>*/}
                                    {/*                            Free Shipping*/}
                                    {/*                        </td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td className="cart_total_label">*/}
                                    {/*                            Total*/}
                                    {/*                        </td>*/}
                                    {/*                        <td className="cart_total_amount">*/}
                                    {/*                            <strong>*/}
                                    {/*                                <span className="font-xl fw-900 text-brand">*/}
                                    {/*                                    213*/}
                                    {/*                                </span>*/}
                                    {/*                            </strong>*/}
                                    {/*                        </td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    </tbody>*/}
                                    {/*                </table>*/}
                                    {/*            </div>*/}
                                    {/*            <a href="#" className="btn ">*/}
                                    {/*                <i className="fi-rs-box-alt mr-10"></i>*/}
                                    {/*                Proceed To CheckOut*/}
                                    {/*            </a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        )}
                    </div>
                </section>


            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.cart,
    activeCart: state.counter,
});

export default Cart;
