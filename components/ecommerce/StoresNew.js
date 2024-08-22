import CategoryProduct2 from "./Filter/CategoryProduct2";
import CategoryProduct3 from "./Filter/CategoryProduct3";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useCategories} from "../../src/api/catalog/categories";
import {useSellers} from "../../src/api/sellers/sellers";
import {SELLER_KEY_IN_LOC} from "../../util/constants";
import IntroPopup from "../elements/IntroPopup";
import outsideClick from "../../util/outsideClick";
import {Modal} from "react-responsive-modal";
import {useSelector} from "react-redux";
import {fetchSeller} from "../../redux/features/seller";


const StoresNew = () => {

    const [openStore, setOpenStore] = useState(false)
    const [open, setOpen] = useState(false)
    const store = useSelector(fetchSeller);

    const {data: sellers, isSuccess, isLoading} = useSellers();

    const changeStore = (value) => {
        if (value && typeof value == 'number') {
            localStorage.setItem(SELLER_KEY_IN_LOC, JSON.stringify({id: value}))
            location.reload();
        }
    }


    return <>

        {isSuccess ? (
                <a className="categories-button-active d-none d-lg-block text-truncate bg-info" id='store-btn'
                   onClick={() => setOpenStore(!openStore)}>
                    {(sellers.data?.find((seller, i) => seller.id == store?.id))?.legal_name || 'Магазины'}
                    <i className="fi-rs-angle-down "></i>
                </a>
            ) :
            (
                <a className="categories-button-active d-none d-lg-block text-truncate bg-info" id='store-btn'
                   onClick={() => setOpenStore(!openStore)}>
                    Магазины
                    <i className="fi-rs-angle-down "></i>
                </a>
            )
        }

        <a className="categories-button-active d-block d-lg-none text-truncate" id='store-btn-mobile'
           onClick={() => setOpenStore(!openStore)}>
            <i className="fi-rs-shop fs-1"></i>
        </a>


        <Modal
            open={openStore}
            onClose={() => setOpenStore(!openStore)}
            center={true}
        >
            <div className="stores-list-content">
                <h4 className={'text-center p-3'}>Выбирайте магазин</h4>
                {isSuccess && (
                    <ul>
                        {sellers.data?.map((seller, i) => (
                            <li
                                onClick={() => changeStore(seller.id)}
                                key={i}
                                className={`${seller.id == store?.id ? 'store-selected' : ''}`}
                            >
                                <a>
                                    {seller.legal_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Modal>
    </>;

}

export default StoresNew;