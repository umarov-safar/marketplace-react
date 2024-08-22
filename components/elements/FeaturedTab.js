import SingleProduct from "../ecommerce/SingleProduct";
import {useEffect, useState} from "react";
import {getSeller} from "../../util/util";

const FeaturedTab = ({products}) => {
    const showItem = 10
    const [seller, setSeller] = useState()

    useEffect(() => {
        setSeller(getSeller);

    }, [products]);

    return (
        <>
            {products.map((product, i) => (
                <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                    <SingleProduct product={product}/>
                </div>
            ))}
        </>
    );
};

export default FeaturedTab;
