import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchCustomer} from "../redux/features/customer";
import {useBasketItems, useBaskets} from "../src/api/baskets";
import storage from "../util/localStorage";
import {AuthLocalStorageKeys, CART_ITEMS, COMPANY_ID_LOC, SELLER_KEY_IN_LOC} from "../util/constants";

const filter = {
    include: ['items']
}

export const Basket = () => {
    const [seller, setSeller] = useState();
    const {data, isSuccess} = useBaskets(filter, {
        enabled: !!filter?.seller_id
    });

    useEffect(() => {
        if (storage.isset(COMPANY_ID_LOC)) {
            filter.company_id = storage.get(COMPANY_ID_LOC);
        }
        if (storage.isset(AuthLocalStorageKeys.TOKEN)) {
            filter.seller_id = storage.get(SELLER_KEY_IN_LOC)?.id
        }
    }, [isSuccess]);

    return (
        <div className="header-action-icon-2 d-flex flex-column align-items-center">
            <Link href="/cart3">
                <a className="mini-cart-icon">
                    <img alt="" src="/assets/imgs/theme/icons/icon-cart.svg"/>
                    {isSuccess && data?.data?.items?.length > 0 && (
                        <span className="pro-count blue">
                            {data.data.items.length}
                        </span>
                    )}
                </a>
            </Link>
            <Link href="/cart3">
                <a>
                    <span className="lable">Корзина</span>
                </a>
            </Link>
        </div>
    );
}