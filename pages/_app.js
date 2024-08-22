import {useEffect, useState} from "react";
// import "react-input-range/lib/css/index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import {Provider} from "react-redux";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import "../public/assets/css/custom.css";

import {store} from "../redux/store";
import Preloader from "./../components/elements/Preloader";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {STALE_TIME} from "../util/constants";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: STALE_TIME,
            retry: 0,
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        },
    },
});


function MyApp({Component, pageProps}) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <>
            {!loading ? (
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <StorageWrapper>
                            <Component {...pageProps} />
                            <ToastContainer/>
                        </StorageWrapper>
                    </Provider>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            ) : (
                <Preloader/>
            )}
        </>
    );
}

export default MyApp;
