import Input from "../../elements/Input";
import Radio from "../../elements/Radio";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useCreateCompanyUser, useUpdateCompanyUser} from "../../../src/api/customers/customers";

export const CompanyUserForm = ({onSubmit, closeModal, companyId, employee}) => {

    const {register, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
            phone: employee?.phone,
            setting_info: {
                full_name: employee?.setting_info?.full_name
            }
        }
    });

    const {isLoading, isSuccess, mutate, data} = useCreateCompanyUser();
    const {
        isSuccess: isUpdated,
        data: upData,
        isLoading: isUpLoading,
        mutate: updateCompanyUser
    } = useUpdateCompanyUser();


    const submitForm = async (formData) => {
        if (employee?.id) {
            await updateCompanyUser({
                employee_id: employee.id,
                data: {...formData, user_id: employee.id, company_id: companyId}
            })
        } else {
            await mutate({...formData, company_id: companyId});
        }
    }

    useEffect(() => {
        if (isSuccess || isUpdated) {
            closeModal(true)
        }
    }, [isSuccess, isUpdated]);


    return (
        <div className="card-body">
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                    <Input
                        label='Телефон'
                        type='text'
                        placeholder={'Напишите вашу телефон здесь'}
                        register={register('phone', {required: "Это поле обязательно к заполнению"})}
                        error={errors.phone && errors.phone.message}
                    />
                    <Input
                        label='Имя'
                        divClass='col-md-12'
                        placeholder={'Напишите вашу имя здесь'}
                        register={register('setting_info.full_name', {required: "Это поле обязательно к заполнению"})}
                        error={errors.setting_info?.full_name && errors.setting_info.full_name.message}
                    />
                    <div>
                        <span className='font-weight-bold'>Активность</span>
                        <span className="d-block text-danger">{errors.gender && errors.gender.message}</span>
                        <div className='d-flex gap-3 my-2'>
                            <Radio
                                label='Активно'
                                divClass='col-md-6'
                                type='radio'
                                value={1}
                                register={register('status', {required: 'Выберите активность'})}
                                defaultChecked={employee?.status == 1}
                            />
                            <Radio
                                label='Не активно'
                                divClass='col-md-6'
                                type='radio'
                                value={2}
                                defaultChecked={employee?.status == 2}
                                register={register('status')}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button
                            type="submit"
                            className="btn btn-fill-out submit font-weight-bold"
                            name="submit"
                            value="Submit"
                        >
                            Сохранить {isLoading || isUpLoading && '...'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}