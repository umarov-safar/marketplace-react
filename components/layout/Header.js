import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import Search from "../ecommerce/Search";
import Catalog from "../ecommerce/Catalog";
import {HeaderTop} from "./HeaderTop";
import StoresNew from "../ecommerce/StoresNew";
import {Basket} from "../Basket";
import {PurchaseType} from "../ecommerce/PurchaseType";

const Header = () => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
    });


    const handleToggle = () => setToggled(!isToggled);

    return (
        <header className="header-area header-style-1 header-height-2">
            <div className="header-top header-top-ptb-1  d-lg-block">
                <HeaderTop/>
            </div>
            <div className={`header-middle py-4 d-lg-block sticky-bar ${scroll ? 'stick' : ''}`}>
                <div className="container">

                    {/* desktop menu*/}
                    <div className='row d-none d-lg-flex align-items-center'>
                        <div className="col-lg-4">
                            <div className="header-wrap">
                                <div className="logo d-lg-block">
                                    <Link href="/">
                                        <a>
                                            <img
                                                style={{width: '80px', maxWidth: 'unset'}}
                                                className={'mr-3'}
                                                src="/assets/imgs/logo.webp"
                                                alt="logo"
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="main-categori-wrap d-lg-block ml-15">
                                    <a className="categories-button-active " onClick={handleToggle}>
                                        Каталог
                                        <i className="fi-rs-angle-down"></i>
                                    </a>
                                    {isToggled && <Catalog onClose={() => setToggled(!isToggled)}/>}
                                </div>
                                <div className="main-categori-wrap stores-btn d-lg-block ml-15">
                                    <StoresNew/>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-4'>
                            <div className="search-style-2  d-flex align-items-center justify-content-between">
                                <Search/>
                            </div>
                        </div>

                        <div className='col-lg-4'>
                            <div className="header-action-right w-100">
                                <div className="header-action-2 w-100 justify-content-around">
                                    <PurchaseType/>
                                    <div
                                        className={`header-action-icon-2 d-flex flex-column align-items-center`}>
                                        <Link href="#">
                                            <a>
                                                <img className="svgInject"
                                                     src="/assets/imgs/theme/icons/icon-heart.svg"/>
                                                {/*<span className="pro-count blue">{totalWishlistItems}</span>*/}
                                            </a>
                                        </Link>
                                        <Link href="#">
                                            <span className="lable">Избранное</span>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2 d-flex flex-column align-items-center">
                                        <Link href="/account">
                                            <a>
                                                <img className="svgInject" alt="Petrushka"
                                                     src="/assets/imgs/theme/icons/icon-user.svg"/>
                                            </a>
                                        </Link>
                                        <Link href="/account">
                                            <a>
                                                <span className="lable ml-0">Аккаунт</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <Basket/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* mobile */}
                    <div className='row d-lg-none'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div>
                                <a onClick={handleToggle} id='category-btn-mobile'>
                                    <i className='fi-rs-apps fs-1'></i>
                                </a>
                                {isToggled && <Catalog onClose={() => setToggled(!isToggled)}/>}
                            </div>
                            <div className="d-lg-block ">
                                <StoresNew/>
                            </div>
                            <div className="logo d-lg-block">
                                <Link href="/">
                                    <img
                                        style={{width: '80px', maxWidth: 'unset'}}
                                        className={'mr-3'}
                                        src="/assets/imgs/logo.webp"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div
                                className={`header-action-icon-2 d-flex flex-column align-items-center`}>
                                <Link href="#">
                                    <a>
                                        <img className="svgInject"
                                             src="/assets/imgs/theme/icons/icon-heart.svg"/>
                                        {/*<span className="pro-count blue">{totalWishlistItems}</span>*/}
                                    </a>
                                </Link>
                            </div>
                            <div className="header-action-icon-2 d-flex flex-column align-items-center">
                                <Link href="/account">
                                    <a>
                                        <img className="svgInject" alt="Petrushka"
                                             src="/assets/imgs/theme/icons/icon-user.svg"/>
                                    </a>
                                </Link>
                            </div>
                            <div className="header-action-icon-2 d-flex flex-column align-items-center">
                                <Link href="#">
                                    <a className="mini-cart-icon">
                                        <img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg"/>
                                        {/*<span className="pro-count blue">{totalCartItems}</span>*/}
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <PurchaseType/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
