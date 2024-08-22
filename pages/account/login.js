import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {AUTH_INFO} from "../../util/constants";
import {apiClient} from "../../src/api/apiClient";
import Layout from "../../components/layout/Layout";
import {updateAuthInfo} from "../../util/helpers";


function Login() {
    const [showPhoneFrom, setShowPhoneForm] = useState(true);
    const [errorsResponse, setErrors] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm();

    const router = useRouter();

    const handleRegister = async (data) => {
        let response = await apiClient.post('auth/register', {data});

        if (response.errors) {
            setErrors(response.errors);
            return;
        }
        setShowPhoneForm(false);
        console.log(response)
    }
    const handleLogin = async (data) => {
        data = {login: data.phone, password: data.password};
        try {
            let response = await apiClient.post('auth/login', {data});

            if (response.errors) {
                setErrors(response.errors);
                console.log(errors);
                return;
            }

            updateAuthInfo(response);
            if (response.data) {
                router.push('/account');
            }

            console.log(response)
        } catch (e) {
            console.log(e)
            setErrors([{message: "Проверьтe код пожалуйста!"}])
        }
    }

    useEffect(() => {
        let authInfo = localStorage.getItem(AUTH_INFO);
        authInfo = JSON.parse(authInfo);

        if (authInfo?.access_token) {
            router.push('/account');
        }

    }, []);


    return (
        <>
            <Layout parent="Главная" sub="Вход">
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-6 pr-30 d-none d-lg-block">
                                        <img className="border-radius-15" src="/assets/imgs/page/login-1.png" alt=""/>
                                    </div>
                                    <div className="col-lg-6 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all bg-white">
                                                <div className="heading_s1">
                                                    <h1 className="mb-5">Вход</h1>
                                                </div>
                                                {errorsResponse?.map((item, i) => (
                                                    <p key={i} className='text-danger'>{item?.message}</p>))}
                                                {/* Register/Login with phone to get new code */}
                                                {showPhoneFrom ?
                                                    <form method="post" onSubmit={handleSubmit(handleRegister)}>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                {...register('phone', {required: true, min: 10})}
                                                                placeholder="Напишите вашу номер тел..."/>
                                                        </div>
                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-heading btn-block hover-up"
                                                                name="login"
                                                            >Вход
                                                            </button>
                                                        </div>
                                                    </form>
                                                    :
                                                    <form method="post" onSubmit={handleSubmit(handleLogin)}>
                                                        <div className="form-group">
                                                            <input required="" type="number"
                                                                   {...register('password', {
                                                                       required: true,
                                                                       min: 3,
                                                                       value: null
                                                                   })}
                                                                   placeholder="Inter your password"/>
                                                        </div>
                                                        <div className="login_footer form-group mb-50">
                                                            <div className="chek-form">
                                                                <div className="custome-checkbox">
                                                                    <input className="form-check-input" type="checkbox"
                                                                           name="checkbox" id="exampleCheckbox1"
                                                                           value=""/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="exampleCheckbox1"><span>Запомни мне</span></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-heading btn-block hover-up"
                                                                name="login"
                                                            >Проверить код
                                                            </button>
                                                        </div>
                                                    </form>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;
