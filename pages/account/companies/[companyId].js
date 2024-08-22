import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";
import Link from "next/link";
import Companies from "../../../components/ecommerce/Account/Companies";
import React, {useEffect, useState} from "react";
import {apiClient} from "../../../src/api/apiClient";
import {CompanyForm} from "../../../components/ecommerce/Account/CompanyForm";
import {Modal} from "react-responsive-modal";
import {CompanyUserForm} from "../../../components/ecommerce/Account/CompanyUserForm";
import {useDeleteCompanyUser, useGetCompany} from "../../../src/api/customers/customers";
import {HALF_MIN} from "../../../util/constants";

const Company = () => {
    const router = useRouter();
    const {companyId} = router.query;
    const [employee, setEmployee] = useState();
    //Modal
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const {data: company, isSuccess, isLoading} = useGetCompany(companyId, {params: {include: ['employees']}}, {
        cacheTime: HALF_MIN - 0.2
    });
    const {isSuccess: isDeleted, mutate} = useDeleteCompanyUser();

    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };


    const deleteEmployee = async (id) => {
        let okDelete = confirm('Вы действительно хотите удалить!')

        if (!okDelete) return;

        await mutate(id);
    }


    const editEmployee = (employee) => {
        setEmployee(employee)
        setOpen(!open)
    }

    const addEmployee = () => {
        setOpen(!open);
    }

    // useEffect(() => getCompany, [open, company]);

    return (
        <Layout parent="Home" sub="Pages" subChild="Account">
            <div className="page-content pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="dashboard-menu">
                                        <ul className="nav flex-column" role="tablist">
                                            <li className="nav-item">
                                                <a
                                                    className={
                                                        activeIndex === 1 ? "nav-link active" : "nav-link"
                                                    }
                                                    onClick={() => handleOnClick(1)}
                                                >
                                                    <i className="fi-rs-settings-sliders mr-10"></i>
                                                    Компания
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={
                                                        activeIndex === 2 ? "nav-link active" : "nav-link"
                                                    }
                                                    onClick={() => handleOnClick(2)}
                                                >
                                                    <i className="fi-rs-marker mr-10"></i>Закази
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={
                                                        activeIndex === 3 ? "nav-link active" : "nav-link"
                                                    }
                                                    onClick={() => handleOnClick(3)}
                                                >
                                                    <i className="fi-rs-user mr-10"></i> Сотрудники
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='col-md-9'>

                                    {activeIndex == 3 && <div>
                                        <div className='d-flex  mb-15'>
                                            <h3>Сотрудники</h3>
                                            <button
                                                onClick={addEmployee}
                                                className='btn-sm btn ms-auto'
                                            >Добавить сотрудник
                                            </button>
                                            <Modal open={open} onClose={closeModal}
                                                   classNames={{modal: 'overflow-y-unset'}}
                                                   center>
                                                <CompanyUserForm employee={employee} companyId={companyId}
                                                                 closeModal={closeModal}/>
                                            </Modal>
                                        </div>
                                        {company?.data && company.data?.employees.map((employee) => (
                                            <div key={employee.id} className="card shadow border my-2">
                                                <div className="card-header">
                                                    <h6>{employee.setting_info?.full_name || employee.phone}</h6>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">
                                                        <span
                                                            className='fw-bold'>ФИО:</span> {employee.setting_info?.full_name}
                                                    </p>
                                                    <p className="card-text"><span
                                                        className='fw-bold'>Phone:</span> {employee.phone}</p>
                                                    <br/>
                                                    <div className='d-flex align-items-center gap-1'>
                                                        <a
                                                            onClick={() => editEmployee(employee)}
                                                            className="btn-sm">Редактировать</a>
                                                        <a
                                                            onClick={() => {
                                                                deleteEmployee(employee.id)
                                                            }}
                                                            className="btn-sm text-danger">Удалить</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default Company;