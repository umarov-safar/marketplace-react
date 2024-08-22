import Link from "next/link";
import SwiperCore, {Autoplay, Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {useCategories} from "../../src/api/catalog/categories";


SwiperCore.use([Navigation, Autoplay]);

const CategorySlider2 = () => {

    const {data, isSuccess, isLoading} = useCategories({
        offset: 0,
        limit: 20
    });

    return (
        <>
            <Swiper
                slidesPerView={8}
                spaceBetween={0}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1",
                }}
                className="custom-class"
            >
                {isSuccess && data.data?.map((item, i) => (
                    <SwiperSlide className='_category' key={i}>
                        <div className="card-1">
                            <figure className=" img-hover-scale overflow-hidden">
                                <Link href={`/categories/${item.id}`}>
                                    <a>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + item.images.mobile_url}`}
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </figure>
                            <h6>
                                <Link href={`/categories/${item.id}`}>
                                    <a>{item.name}</a>
                                </Link>
                            </h6>
                            <span>{item.products_count}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
                id="carausel-10-columns-arrows"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-arrow-small-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-arrow-small-right"></i>
                </span>
            </div>
        </>
    );
};

export default CategorySlider2;
