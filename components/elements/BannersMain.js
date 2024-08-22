import React from "react";
import Link from "next/link"

const BannersMain = () => {
    return (
        <>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay="0"
                >
                    <img src="/assets/imgs/banner/banner-1.png" alt=""/>
                    <div className="banner-text">
                        <h4>
                            Ежедневная свежесть <br/> и чистота с sнашими <br/> продуктами
                        </h4>
                        <Link href="#"><a className="btn btn-xs">
                            Купи сейчас <i className="fi-rs-arrow-small-right"></i>
                        </a></Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay=".2s"
                >
                    <img src="/assets/imgs/banner/banner-2.png" alt=""/>
                    <div className="banner-text">
                        <h4>
                            Сделайте свой
                            <br/>
                            завтрак полезным
                            <br/>
                            и легким
                        </h4>
                        <Link href="#"><a className="btn btn-xs">
                            Купи сейчас <i className="fi-rs-arrow-small-right"></i>
                        </a></Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 d-md-none d-lg-flex">
                <div
                    className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".4s"
                >
                    <img src="/assets/imgs/banner/banner-3.png" alt=""/>
                    <div className="banner-text">
                        <h4>
                            Лучшие органические <br/>
                            продукты онлайн
                        </h4>
                        <Link href="#"><a className="btn btn-xs">
                            Купи сейчас <i className="fi-rs-arrow-small-right"></i>
                        </a></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannersMain;
