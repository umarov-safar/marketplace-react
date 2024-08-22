import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import {server} from "../../config/index";
import {findProductIndex} from "../../util/util";
import {useGetProduct} from "../../src/api/catalog/products";
import {useRouter} from "next/router";
import {fetchSeller} from "../../redux/features/seller";
import {useSelector} from "react-redux";

const ProductPage = () => {

    const {query} = useRouter();
    const seller = useSelector(fetchSeller);

    const {isSuccess, isLoading, data} = useGetProduct({
        id: query?.slug,
        seller_id: seller.id
    })

    return (
        <>
            <Layout parent="Home" sub="Shop" subChild={data?.data?.title}>
                <div className="container">
                    {isSuccess && <ProductDetails product={data?.data}/> || isLoading && 'loading...'}
                </div>
            </Layout>
        </>
    );
}
// export async function getServerSideProps() {
//     const res = await fetch(`${process.env.API_HOST}sellers/sellers:search`,{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: {offset: 0, limit: 20}
//     })
//     const data = await res.json();
//
//     return {props: {data}}
// }

export default ProductPage;
