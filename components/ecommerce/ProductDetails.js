import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import {addToCompare} from "../../redux/action/compareAction";
import {addToWishlist} from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import Link from "next/link";
import {fetchCustomer} from "../../redux/features/customer";
import {useCreateBaskets} from "../../src/api/baskets";
import {getSeller} from "../../util/util";

const ProductDetails = ({product}) => {
    const [quantity, setQuantity] = useState(1);

    const [seller, setSeller] = useState();
    const customer = useSelector(fetchCustomer);

    const {mutateAsync, isSuccess} = useCreateBaskets();

    useEffect(() => {
        setSeller(getSeller());
    }, [])

    const handleCart = (product) => {
        toast("Product added to Cart!");
    };

    const handleCompare = (product) => {
        toast("Added to Compare list!");
    };

    const handleWishlist = (product) => {
        toast("Added to Wishlist!");
    };

    const addToCart = async () => {
        let offer = product.offers.find(item => {
            if (item.product_id == product.id && item.seller_id == seller?.id) {
                return item;
            }
        })

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

        let data = await mutateAsync(basket);
        toast("Товар добавлено в корзине!");
    };

    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <div className="product-detail accordion-detail">
                                    <div className="row mb-50  mt-30">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                            <div className="detail-gallery">
                                                <div className="product-image-slider">
                                                    <ThumbSlider product={product}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <div className="detail-info  pr-30 pl-30">
                                                <h2 className="title-detail">{product.name}</h2>

                                                <div className="clearfix product-price-cover">
                                                    <div className="product-price primary-color float-left">
                                                    <span
                                                        className="current-price  text-brand">{product.offer.base_price} ₽</span>
                                                        <span>
                                                        <span
                                                            className="old-price font-md ml-15">{product.oldPrice ? `$ ${product.oldPrice}` : null}</span>
                                                    </span>
                                                    </div>
                                                </div>

                                                <div className="short-desc mb-30">
                                                    <p className="font-lg">{product.description}</p>
                                                </div>

                                                <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                                <div className="detail-extralink">
                                                    <div className="product-extra-link2">
                                                        <button
                                                            onClick={addToCart}
                                                            className="button button-add-to-cart"
                                                        >
                                                            Добавить в корзину
                                                        </button>
                                                        <a aria-label="Add To Wishlist" className="action-btn hover-up"
                                                           onClick={(e) => handleWishlist(product)}>
                                                            <i className="fi-rs-heart"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <ul className="product-meta font-xs color-grey mt-50">
                                                    <li className="mb-5">
                                                        Артикуль: <a href="#"> {product.vendor_code}</a>
                                                    </li>
                                                    <li>
                                                        Категория:
                                                        <Link href={`/categories/${product.category?.id}`}>
                                                            <a className="in-stock text-success ml-5">{product.category.name}</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});


export default ProductDetails;
