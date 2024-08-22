import Input from "../../elements/Input";
import Radio from "../../elements/Radio";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {AddressSuggestions, PartySuggestions} from "react-dadata";
import {useCreateCompany} from "../../../src/api/customers/customers";

export const CompanyForm = ({closeModal}) => {

    const [company, setCompany] = useState();
    const {register, formState: errors, handleSubmit} = useForm()
    const {isSuccess, isLoading, mutate} = useCreateCompany();

    const submitForm = () => {
        if (company) {
            mutate({inn: company.data.inn, info: company.data})
        }
    }

    if (isSuccess) {
        closeModal(true)
    }

    return (
        <div className="card-body">
            <form onSubmit={handleSubmit(submitForm)} className='row'>
                <div className="row">
                    <div className="my-3">
                        <span className='font-weight-bold'>Ищите компания по ИНН</span>
                        <PartySuggestions
                            token="51f0e3673e2c3cca210de7c411aacb6cfd10f8f9"
                            value={company}
                            onChange={setCompany}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <button
                        type="submit"
                        className="btn btn-sm  font-weight-bold"
                        name="submit"
                        value="Submit"
                        onChange={() => {
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    )

}