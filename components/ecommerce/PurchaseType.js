import React, {useEffect, useState} from "react";
import Link from "next/link";
import storage from "../../util/localStorage";
import {AuthLocalStorageKeys, COMPANY_ID_LOC, HALF_MIN} from "../../util/constants";
import {useCompanies} from "../../src/api/customers/customers";

export const PurchaseType = () => {

    const [showCompany, setShowCompany] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [companyId, setCompanyId] = useState();
    const {data, isLoading, isSuccess} = useCompanies({}, {enabled: loggedIn});
    const [showForSelfLink, setShowForSelfLink] = useState(false);

    useEffect(() => {
        setLoggedIn(storage.get(AuthLocalStorageKeys.LOGGED_IN) || false);
        setCompanyId(storage.get(COMPANY_ID_LOC));
    }, []);

    const changeCompany = (id) => {
        storage.set(COMPANY_ID_LOC, id);
        window.location.reload();
    };

    const selfPurchase = () => {
        storage.remove(COMPANY_ID_LOC);
        window.location.reload();
    }


    return loggedIn && (
        <div
            className={`position-relative d-lg-block`}>
            {companyId ? (
                <Link href="#">
                    <a
                        onClick={() => {
                            setShowForSelfLink(!showForSelfLink)
                            setShowCompany(!showCompany)
                        }}
                        className={`categories-button-active d-flex flex-column justify-content-center align-items-center`}>

                        <img className="svgInject" width={30}
                             src="/assets/imgs/theme/icons/company-icon.png"/>
                        <span
                            className="lable">
                            {(data?.data?.find((company, i) => companyId === company.id).info?.name?.short_with_opf)}
                        </span>
                    </a>
                </Link>) : (
                <Link href="#">
                    <a
                        onClick={() => {
                            setShowForSelfLink(!showForSelfLink)
                            setShowCompany(!showCompany)
                        }}
                        className={`categories-button-active d-flex flex-column justify-content-center align-items-center ${companyId && 'bg-info'}`}>

                        <img className="svgInject" width={30}
                             src="/assets/imgs/theme/icons/company-icon.png"/>
                        <span className="lable">Для себя</span>
                    </a>
                </Link>

            )}
            {showCompany && (<ul className='company-list position-absolute shadow-lg bg-white p-2'>
                {showForSelfLink && <li onClick={selfPurchase}><a>Купить для себя</a></li>}
                {data?.data?.map((company, i) => (
                    <li>
                        <a
                            onClick={() => changeCompany(company.id)}
                        >{company.info?.name?.short_with_opf}</a>
                    </li>
                ))}
            </ul>)}
        </div>
    );
}