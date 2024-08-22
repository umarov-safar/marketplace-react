import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import Input from "./Input";
import {AddressDadata} from "./AddressDadata";
import Button from "./Button";
import {CheckBoxForm} from "./CheckBox";
import Radio from "./Radio";
import {apiClient} from "../../src/api/apiClient";
import {updateAuthInfo} from "../../util/helpers";

const IntroPopup = () => {
    const [openClass, setOpenClass] = useState(false);
    const refStore = useRef();

    const [registerForm, setRegisterForm] = useState(true);

    const [typeOfPurchase, setTypeOfPurchase] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState();
    const [errorsResponse, setErrors] = useState([]);


    const handleRegister = async () => {

        if (phoneNumber.length < 7) {
            setErrors([{message: 'Проверте форм'}]);
            return;
        }

        let data = {phone: phoneNumber}
        let response = await apiClient.post('auth/register', {data});

        if (response.errors) {
            setErrors(response.errors);
            return;
        }

        console.log(response)
        setRegisterForm(false);
        setErrors([])
    }

    const handleCode = async () => {
        let data = {login: phoneNumber, password: code};
        try {
            let response = await apiClient.post('auth/login', {data});

            if (response.errors) {
                setErrors(response.errors);
                console.log(errors);
                return;
            }

            updateAuthInfo(response);
            if (response.data) {
                window.location.reload();
            }

            console.log(response)
        } catch (e) {
            console.log(e)
            setErrors([{message: "Проверьтe код пожалуйста!"}])
        }
    }


    return (
        <>
            <div
                className={
                    openClass
                        ? "modal fade custom-modal d-none"
                        : "modal fade custom-modal  show d-block"
                }
            >
                <div className="modal-dialog">

                    <div className="modal-content">
                        <i
                            onClick={() => setOpenClass(!openClass)}
                            className='btn-close catalog-close pointer'></i>
                        <div className="modal-body">
                            <div
                                className="deal"
                            >
                                <h2 className="product-title text-brand">
                                    Добро пожаловать!
                                </h2>
                                <div className="detail-info">
                                    <div className='col-12 col-md-8'>
                                        {errorsResponse?.map(e => (<p className='text-danger'>{e.message}</p>))}
                                        {registerForm ? (<form>
                                                    <Input
                                                        label={'Ваш номер телефон'}
                                                        placeholder={'Напишите ваш номер телефона'}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />

                                                    <div className='d-flex gap-3'>
                                                        <Radio
                                                            name={'typePurchase'}
                                                            label={'Доставка'}
                                                            value={1}
                                                            checked={typeOfPurchase === 1}
                                                            onChange={(e) => setTypeOfPurchase(parseInt(e.target.value))}
                                                        />
                                                        <Radio
                                                            name={'typePurchase'}
                                                            label={'Самовывоз'}
                                                            value={2}
                                                            checked={typeOfPurchase === 2}
                                                            onChange={(e) => setTypeOfPurchase(parseInt(e.target.value))}
                                                        />
                                                    </div>

                                                    {typeOfPurchase === 1 &&
                                                        <AddressDadata setAddress={(e) => console.log(e)}/>}
                                                    <div className={'mt-3'}>
                                                        <Button
                                                            onClick={handleRegister}
                                                            text={'Отправить'}
                                                        />
                                                    </div>
                                                </form>
                                            ) :
                                            <form>
                                                <Input
                                                    label={'Код'}
                                                    name={'code'}
                                                    placeholder={'Напишите код здесь'}
                                                    onChange={(e) => setCode(e.target.value)}
                                                />
                                                <Button
                                                    onClick={handleCode}
                                                    text={'Отправить'}
                                                />
                                            </form>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    openClass
                        ? "modal-backdrop fade d-none"
                        : "modal-backdrop fade show"
                }
            ></div>
        </>
    );
};

export default IntroPopup;
