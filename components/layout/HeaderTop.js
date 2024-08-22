import Link from "next/link";
import React, {useEffect, useState} from "react";
import {AddressForm} from "../ecommerce/Account/AddressForm";
import {Modal} from "react-responsive-modal";
import {AddressSuggestions} from "react-dadata";
import {ChooseAddress} from "../ecommerce/ChooseAddress";
import {addressInfo} from "../../util/util";
import storage from "../../util/localStorage";
import { DELIVERY_TYPE_ADDRESS, DELIVERY_TYPE_IN_LOC, DELIVERY_TYPE_SELF } from "../../util/constants";

export const HeaderTop = () => {

    const [openAddress, setOpenAddress] = useState(false);
    const [address, setAddress] = useState();
    const [deliveryType, setDeliveryType] = useState();

    useEffect(() => {
        setAddress(addressInfo())
        setDeliveryType(storage.get(DELIVERY_TYPE_IN_LOC) ?? DELIVERY_TYPE_ADDRESS);
    }, [deliveryType]);


    const changeDeliveryType = (type) => {
        storage.setDefault(DELIVERY_TYPE_IN_LOC, type);
        setDeliveryType(type)
    }

    return (<div className="container">
        <Modal open={openAddress} onClose={() => {
            setOpenAddress(!openAddress)
        }} classNames={{modal: 'overflow-y-unset'}} center>
            <ChooseAddress closeModal={() => setOpenAddress(!openAddress)}/>
        </Modal>
        <div className="row align-items-center justify-content-between">
            <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                    <ul>
                        <li 
                            onClick={() => {changeDeliveryType(DELIVERY_TYPE_ADDRESS)}}
                            className={`deliver-btn ${deliveryType == DELIVERY_TYPE_ADDRESS ? "active" : ''}`}>
                            <Link href="#">
                                Доставка
                            </Link>
                        </li>
                        <li 
                            onClick={() => {changeDeliveryType(DELIVERY_TYPE_SELF)}}
                            className={`deliver-btn ${deliveryType == DELIVERY_TYPE_SELF ? "active" : ''}`}>
                            <Link href="#">
                                Самовывоз
                            </Link>
                        </li>
                        {deliveryType == DELIVERY_TYPE_ADDRESS && (
                            <li
                            onClick={() => {
                                setOpenAddress(!openAddress)
                            }}
                        >
                            <Link href="#">
                                <a>{address?.value || 'Адрес доставки'}</a>
                            </Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="col-xl-5 col-lg-6 d-none d-lg-block">
                <div className="header-info header-info-right">
                    <ul>
                        <li
                            className='top-menu d-flex flex-column position-relative align-items-center'>
                            <Link href="#">
                                <a>Покупателям <i className="fi-rs-angle-down fs"></i></a>
                            </Link>
                            <div className='sub-menu position-absolute top-0 bg-white d-none'>
                                <ul
                                    className='ul-submenu border p-2'>
                                    <li className='my-3 w-100'><Link href="#">List 1 sada</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 2 asd</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 3 a</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 6 test</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li
                            className='top-menu d-flex flex-column position-relative align-items-center'>
                            <Link href="#">
                                <a>Партнёрам <i className="fi-rs-angle-down fs"></i></a>
                            </Link>
                            <div className='sub-menu position-absolute top-0 bg-white d-none'>
                                <ul
                                    className='ul-submenu border p-2'>
                                    <li className='my-3 w-100'><Link href="#">List 1 sada</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 2 asd</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 3 a</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 6 test</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li
                            className='top-menu d-flex flex-column position-relative align-items-center'>
                            <Link href="#">
                                <a>О компании <i className="fi-rs-angle-down fs"></i></a>
                            </Link>
                            <div className='sub-menu position-absolute top-0 bg-white d-none'>
                                <ul
                                    className='ul-submenu border p-2'>
                                    <li className='my-3 w-100'><Link href="#">List 1 sada</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 2 asd</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 3 a</Link></li>
                                    <li className='my-3 w-100'><Link href="#">List 6 test</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="tel:" className='tel-top-head'><span>+7(999)999 9999</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>)
}