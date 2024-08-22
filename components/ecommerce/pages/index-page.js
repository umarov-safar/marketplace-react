import React from "react";
import Link from "next/link";
import ProductSections from "../ProductSections";
import Layout from "../../layout/Layout";
import Intro2 from "../../sliders/Intro2";
import BannersMain from "../../elements/BannersMain";
import CategorySlider2 from "../../sliders/Category2";


function IndexPage() {
    return (
        <Layout noBreadcrumb="d-none" headerStyle="header-style-1">
            <section className="home-slider style-2 position-relative mb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            <div className="home-slide-cover">
                                <Intro2/>
                            </div>
                        </div>
                        <div className="col-lg-4 d-none d-xl-block">
                            <div className="banner-img style-3 animated animated" style={{maxHeight: 440}}>
                                <div className="banner-text mt-50">
                                    <h2 className="mb-50">
                                        Мы <br/> доставляем
                                        <span className="text-brand">
                                               <br/>  к вам домой
                                            </span>
                                    </h2>
                                    <Link href="/shop-grid-right">
                                        <a
                                            className="btn btn-xs"
                                        >
                                            К покупке
                                            <i className="fi-rs-arrow-small-right"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="banners mb-15">
                <div className="container">
                    <div className="row">
                        <BannersMain/>
                    </div>
                </div>
            </section>

            <section className="product-tabs section-padding position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProductSections/>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="banner-2 section-padding pb-0">
                    <div className="container">
                        <Banner2 />
                    </div>
                </section> */}

            <section className="featured  section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay="0"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-1.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Лучшие цены и предложения
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".1s"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-2.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Бесплатная доставка
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".2s"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-3.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Отличное ежедневное предложение
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".3s"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-4.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Широкий ассортимент
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".4s"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-5.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Легкий возврат
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
                            <div
                                className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".5s"
                            >
                                <div className="banner-icon">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-6.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="banner-text">
                                    <h3 className="icon-box-title">
                                        Safe delivery
                                    </h3>
                                    <p>Within 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="popular-categories section-padding">
                <div className="container">
                    <div className="section-title">
                        <div className="title">
                            <h3>Купи по категориям</h3>
                            <Link href="/shop-grid-right"><a className="show-all">
                                Все категории
                                <i className="fi-rs-angle-right"></i>
                            </a></Link>
                        </div>
                    </div>
                    <div className="carausel-8-columns-cover position-relative">
                        <div
                            className="carausel-8-columns"
                            id="carausel-8-columns"
                        >
                            <CategorySlider2/>
                        </div>
                    </div>
                </div>
            </section>

            {/*<Bottom />*/}

        </Layout>
    );
}

export default IndexPage;