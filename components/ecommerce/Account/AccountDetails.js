import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {fetchCustomer} from '../../../redux/features/customer'
import Input from '../../elements/Input'
import Radio from '../../elements/Radio'
import {useUpdateCustomer} from "../../../src/api/customers/customers";

const AccountDetails = ({customer}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            phone: customer.phone,
            first_name: customer.first_name,
            middle_name: customer.middle_name,
            last_name: customer.last_name,
            email: customer.email,
            birthday: customer.birthday,
        }
    });

    const {isLoading, isSuccess, data: dataResponse, mutate, error} = useUpdateCustomer();

    const submitForm = async (data) => {
        const customerInfo = {...data, customer_id: customer.id};
        await mutate(customerInfo);
    }


    return (
        <div className="card">
            <div className="card-header">
                <h5>Детали учетной записи</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <Input
                            label='Имя'
                            divClass='col-md-6'
                            placeholder={'Напишите вашу имя здесь'}
                            register={register('first_name', {required: "Это поле обязательно к заполнению"})}
                            error={errors.first_name && errors.first_name.message}
                        />
                        <Input
                            label='Фамилия'
                            divClass='col-md-6'
                            placeholder={'Напишите вашу фамиля здесь'}
                            register={register('last_name', {required: "Это поле обязательно к заполнению"})}
                            error={errors.last_name && errors.last_name.message}
                        />
                        <Input
                            label='Отчество'
                            placeholder={'Напишите вашу отчество здесь'}
                            register={register('middle_name')}
                        />
                        <Input
                            label='Телефон'
                            placeholder={'Напишите вашу телефон здесь'}
                            register={register('phone', {required: "Это поле обязательно к заполнению"})}
                            error={errors.phone && errors.phone.message}
                        />

                        <Input
                            label='Email'
                            placeholder={'Напишите вашу email здесь'}
                            type='email'
                            register={register('email', {required: "Это поле обязательно к заполнению"})}
                            error={errors.email && errors.email.message}
                        />
                        <div>
                            <span className='font-weight-bold'>Пол</span>
                            <span className="d-block text-danger">{errors.gender && errors.gender.message}</span>
                            <div className='d-flex gap-3 my-2'>
                                <Radio
                                    label='Женжина'
                                    divClass='col-md-6'
                                    type='radio'
                                    value={1}
                                    register={register('gender', {required: 'Выберите пол'})}
                                    defaultChecked={customer.gender == 1}
                                />
                                <Radio
                                    label='Мужчина'
                                    divClass='col-md-6'
                                    type='radio'
                                    value={2}
                                    defaultChecked={customer.gender == 2}
                                    register={register('gender')}
                                />
                            </div>
                        </div>

                        <Input
                            label='Дата рождения'
                            divClass='col-md-6'
                            type="date"
                            register={register('birthday')}
                        />

                        <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-fill-out submit font-weight-bold"
                                name="submit"
                                value="Submit"
                            >
                                Сохранить {isLoading && '...'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AccountDetails