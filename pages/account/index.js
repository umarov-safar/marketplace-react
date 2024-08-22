import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Account from "../../components/ecommerce/Account/Account";
import {getAuthInfoFromLocalStorage} from "../../util/helpers";

const Index = () => {
    const router = useRouter();
    const [isLoggedIng, setIsLoggedIn] = useState(false)
    useEffect(() => {
        let authInfo = getAuthInfoFromLocalStorage();
        if (!authInfo?.access_token) {
            router.push('/account/login');
            return;
        }

        setIsLoggedIn(true);
    }, []);

    return isLoggedIng && <Account/>;
}

export default Index;