import CategoryProduct2 from "./Filter/CategoryProduct2";
import CategoryProduct3 from "./Filter/CategoryProduct3";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useCategories, useGetCategory} from "../../src/api/catalog/categories";


const Catalog = ({onClose}) => {

    const [categoryId, setCategoryId] = useState()
    const {data, isLoading, isSuccess} = useCategories({
        offset: 0,
        limit: 200,
        parent_id: null
    });

    const {data: subCategory, isSuccess: subCatIsSuccess} = useGetCategory(categoryId, {
        enabled: !!categoryId
    });

    const closeCatalog = (e) => {
        if (e.target.classList.contains('catalog-static')) {
            onClose();
        }
    }

    return (
        <div className='catalog-static d-flex'
             onClick={closeCatalog}
        >
            <div className='content'>
                <div className='catalog-logo d-flex align-items-center'>
                    <i
                        onClick={onClose}
                        className='btn-close catalog-close'></i>
                    <Link href="/">
                        <a
                            className='d-flex align-items-center'>
                            <img
                                style={{width: '80px', maxWidth: 'unset'}}
                                className={'mr-3'}
                                src="/assets/imgs/logo.webp"
                                alt="logo"
                            />
                        </a>
                    </Link>
                </div>
                <div className='catalog'>
                    <ul className='items'>
                        {data?.data.map((category, i) => (
                            <li className='item' key={i}>
                                <Link
                                    href={`/categories/${category.id}`}>
                                    <a
                                        onMouseEnter={() => setCategoryId(category.id)}
                                        onClick={onClose}
                                    >
                                        <div className='d-flex align-items-center gap-2'>
                                            <img
                                                width={30}
                                                src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + category.images.icon_url}`}
                                                alt={category.name}
                                            />
                                            {category.name}
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {subCatIsSuccess && (
                <div className='content'
                     onMouseLeave={() => setCategoryId(null)}
                >
                    <div className='catalog'>
                        <ul className='items'>
                            {subCategory?.data?.children?.map(category => (
                                <li className='item'>
                                    <Link
                                        href={`/categories/${category.id}`}>
                                        <a
                                            onClick={onClose}
                                        >
                                            <div className='d-flex align-items-center gap-2'>
                                                <img
                                                    width={30}
                                                    src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + category.images.icon_url}`}
                                                    alt={category.name}
                                                />
                                                {category.name}
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Catalog;