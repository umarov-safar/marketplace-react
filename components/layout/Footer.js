import React from "react";
import Link from "next/link"

const Footer = () => {
    return (
        <>
            <footer className="main">
                <section className="section-padding footer-mid">
                    <div className="container pt-15 pb-20">
                        <div className="row">
                            {/*<div className="col">*/}
                            {/*    <div*/}
                            {/*        className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0  wow animate__animated animate__fadeInUp"*/}
                            {/*        data-wow-delay="0"*/}
                            {/*    >*/}
                            {/*        <div className="logo  mb-30">*/}
                            {/*            <Link href="/"><a className="mb-15">*/}
                            {/*                <img*/}
                            {/*                    src="/assets/imgs/logo.webp"*/}
                            {/*                    alt="logo"*/}
                            {/*                />*/}
                            {/*            </a>*/}
                            {/*            </Link>*/}
                            {/*        </div>*/}
                            {/*        <ul className="contact-infor">*/}
                            {/*            <li>*/}
                            {/*                <img*/}
                            {/*                    src="/assets/imgs/theme/icons/icon-location.svg"*/}
                            {/*                    alt=""*/}
                            {/*                />*/}
                            {/*                <strong>Адрес: </strong>{" "}*/}
                            {/*                <span>*/}
                            {/*                    Томск ул. Люксембург 112/1*/}
                            {/*                </span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <img*/}
                            {/*                    src="/assets/imgs/theme/icons/icon-contact.svg"*/}
                            {/*                    alt=""*/}
                            {/*                />*/}
                            {/*                <strong>Тел:</strong>*/}
                            {/*                <span> +7 999 999 9999</span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <img*/}
                            {/*                    src="/assets/imgs/theme/icons/icon-email-2.svg"*/}
                            {/*                    alt=""*/}
                            {/*                />*/}
                            {/*                <strong>Email:</strong>*/}
                            {/*                <span> petrushka@shop.ru</span>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <img*/}
                            {/*                    src="/assets/imgs/theme/icons/icon-clock.svg"*/}
                            {/*                    alt=""*/}
                            {/*                />*/}
                            {/*                <strong>Время работы: </strong>*/}
                            {/*                <span>*/}
                            {/*                     09:00 - 20:00, Пон - Пят*/}
                            {/*                </span>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".1s"
                            >
                                <h4 className="widget-title">Покупателя</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">Доставка и оплата</a>
                                    </li>
                                    <li>
                                        <a href="#">Как мы работаем</a>
                                    </li>
                                    <li>
                                        <a href="#">Зона доставки</a>
                                    </li>
                                    <li>
                                        <a href="#">Правила резерв</a>
                                    </li>
                                    <li>
                                        <a href="#">Политика возврата</a>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".2s"
                            >
                                <h4 className="widget-title ">Продавца</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">Стать продавцом</a>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".1s"
                            >
                                <h4 className="widget-title">Компания</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">О нас</a>
                                    </li>
                                    <li>
                                        <a href="#">Контакты</a>
                                    </li>
                                    <li>
                                        <a href="#">Реквизиты</a>
                                    </li>
                                    <li>
                                        <a href="#">Политика конфиденциальности</a>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="footer-link-widget widget-install-app col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".5s"
                            >
                                <h4 className="widget-title ">Скачайте приложение</h4>
                                <div className="download-app ">
                                    <a
                                        href="#"
                                        className="hover-up mb-sm-2 mb-lg-0"
                                    >
                                        <img
                                            className="active"
                                            src="/assets/imgs/theme/app-store.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a href="#" className="hover-up mb-sm-2">
                                        <img
                                            src="/assets/imgs/theme/google-play.jpg"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <p className="mb-20 ">Безопасные платежные</p>
                                <img
                                    className=""
                                    src="/assets/imgs/theme/payment-method.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    className="container pb-30  wow animate__animated animate__fadeInUp"
                    data-wow-delay="0"
                >
                    <div className="row align-items-center">
                        <div className="col-12 mb-30">
                            <div className="footer-bottom"></div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <Link href="/"><a className="mb-15">
                                <img
                                    src="/assets/imgs/logo.webp"
                                    alt="logo"
                                />
                            </a>
                            </Link>
                            <p className="font-sm mb-0">
                                &copy; 2021 {" "}
                                Все права защищены
                            </p>
                        </div>
                        <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
                            <div className="hotline ">
                                <img
                                    src="/assets/imgs/theme/icons/phone-call.svg"
                                    alt="hotline"
                                />
                                <p>
                                    +7 999 999 999
                                    <span>24/7 Центр поддержки</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
                            <div className="mobile-social-icon">
                                <h6>Подписывайтесь на нас</h6>
                                <a href="#">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                                        alt=""
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        src="/assets/imgs/theme/icons/icon-youtube-white.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
