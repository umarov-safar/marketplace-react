import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchSeller} from "../redux/features/seller";
import dynamic from "next/dynamic";

const IndexPage = dynamic(() => import('../components/ecommerce/pages/index-page'), {ssr: false})
const IndexWithoutStore = dynamic(() => import('../components/ecommerce/pages/index-page-without-store'), {ssr: false})

function Index() {
    let seller = useSelector(fetchSeller);

    return seller?.id ? <IndexPage/> : <IndexWithoutStore/>;
}

export default Index;
