import Layout from "../../layout/Layout";
import React, {useEffect, useState} from "react";
import {getCustomer} from "../../../src/api/customers/customers";
import {useDispatch} from "react-redux";
import {setCustomer} from "../../../redux/features/customer";
import AddressDetails from "./AddressDetails";
import AccountDetails from "./AccountDetails";
import Companies from "./Companies";

function Account() {

    const {data, isLoading, isSuccess} = getCustomer({
        params: {
            includes: ['addresses']
        }
    }, {
        cacheTime: 1000 * 60 * 0.7
    });

    const [customer, setCustomer2] = useState({});

    const [activeIndex, setActiveIndex] = useState(1);

    const dispatch = useDispatch();

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };

    useEffect(() => {
        if (data?.data) {
            setCustomer2(data.data);
            dispatch(setCustomer(data.data))
        }
    }, [data, isSuccess]);

    const logout = () => {
    }

    return <Layout parent="Главная" sub="Аккаунт">
        <div className="page-content pt-150 pb-150">
            <div className="container">
                {isSuccess && <div className="row">
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
                                                Аккаунт
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={
                                                    activeIndex === 2 ? "nav-link active" : "nav-link"
                                                }
                                                onClick={() => handleOnClick(2)}
                                            >
                                                <i className="fi-rs-shopping-bag mr-10"></i>
                                                Заказы
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={
                                                    activeIndex === 3 ? "nav-link active" : "nav-link"
                                                }
                                                onClick={() => handleOnClick(3)}
                                            >
                                                <i className="fi-rs-shopping-cart-check mr-10"></i>
                                                Мои компании
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={
                                                    activeIndex === 4 ? "nav-link active" : "nav-link"
                                                }
                                                onClick={() => handleOnClick(4)}
                                            >
                                                <i className="fi-rs-marker mr-10"></i>
                                                Мои адреса
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={
                                                    activeIndex === 5 ? "nav-link active" : "nav-link"
                                                }
                                                onClick={() => handleOnClick(5)}
                                            >
                                                <i className="fi-rs-user mr-10"></i>
                                                Учетные данные
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                onClick={logout}
                                                className="nav-link">
                                                <i className="fi-rs-sign-out mr-10"></i>
                                                Выход
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {isSuccess && <div className="col-md-9">
                                <div className="tab-content account dashboard-content pl-lg-50">
                                    <div
                                        className={
                                            activeIndex === 1
                                                ? "tab-pane fade active show"
                                                : "tab-pane fade "
                                        }
                                    >
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="mb-0">
                                                    {customer.full_name || 'Обнавите вашу профиль'}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeIndex === 2
                                                ? "tab-pane fade active show"
                                                : "tab-pane fade "
                                        }
                                    >
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="mb-0">Ваши заказы</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    Пока нет заказов
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeIndex === 3
                                                ? "tab-pane fade active show"
                                                : "tab-pane fade "
                                        }
                                    >
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="mb-0">Компании</h3>

                                            </div>
                                            {activeIndex === 3 && <Companies/>}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeIndex === 4
                                                ? "tab-pane fade active show"
                                                : "tab-pane fade "
                                        }
                                    >
                                        {activeIndex === 4 && <AddressDetails customer={customer}/>}
                                    </div>
                                    <div
                                        className={
                                            activeIndex === 5
                                                ? "tab-pane fade active show"
                                                : "tab-pane fade "
                                        }
                                    >
                                        {activeIndex === 5 && <AccountDetails customer={customer}/>}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </Layout>
}

export default Account;
