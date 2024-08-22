import React, {useState} from "react";
import Layout from "../../layout/Layout";
import {useCompanies} from "../../../src/api/customers/customers";
import {HALF_MIN} from "../../../util/constants";
import {CompanyForm} from "./CompanyForm";
import {AddressForm} from "./AddressForm";
import {Modal} from "react-responsive-modal";
import Link from "next/link";


export default function Companies() {

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const {data, isLoading, isSuccess} = useCompanies({}, {cacheTime: HALF_MIN});

    return isLoading ? <p>Loading ...</p> : isSuccess && (
        <div>
            <div className='d-flex justify-content-end'>
                <button
                    onClick={openModal}
                    className='btn btn-sm'>
                    Добавить компанию
                </button>
            </div>
            <Modal open={open} onClose={closeModal} classNames={{modal: 'overflow-y-unset'}} center>
                <CompanyForm closeModal={closeModal}/>
            </Modal>
            {data.data?.map(company => (
                <div key={company.id} className="card shadow border my-2">
                    <div className="card-header">
                        <h4>{company.info?.name?.short_with_opf}</h4>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><span
                            className='fw-bold'>Директор:</span> {company.info?.management?.name}</p>
                        <p className="card-text"><span className='fw-bold'>ИНН:</span> {company.inn}</p>
                        <p className="card-text"><span className='fw-bold'>КПП:</span> {company.info?.kpp}</p>
                        <p className="card-text"><span
                            className='fw-bold'>Address:</span> {company?.info?.address?.value}</p>
                        <br/>
                        <div className='d-flex align-items-center gap-1'>
                            <a className="btn-sm ">Редактировать</a>
                            <Link className="btn-sm" href={`/account/companies/${company.id}`}>Посмотреть</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
