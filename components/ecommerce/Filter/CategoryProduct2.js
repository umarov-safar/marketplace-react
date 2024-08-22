import {useRouter} from "next/router";
import Link from "next/link";

const CategoryProduct2 = ({categories}) => {
    return (
        <>
            <ul>
                {categories?.data?.map((category, i) => (
                    <li key={i}>
                        <Link href={`/categories/${category.id}`}>
                            <a>
                                <img
                                    width={30}
                                    src={`${process.env.NEXT_PUBLIC_CATALOG_IMAGES_URL + category.images.icon_url}`}
                                    alt={category.name}
                                />
                                {category.name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CategoryProduct2;
