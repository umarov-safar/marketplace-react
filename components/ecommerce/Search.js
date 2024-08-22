import {useRouter} from "next/router";
import React, {useState, useRef} from "react";
import {useCategories} from "../../src/api/catalog/categories";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();

    const handleSearch = () => {
        router.push({
            pathname: "/search",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };


    return (
        <>
            <form>
                <input

                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Поиск"
                    style={{height: '42px'}}
                />
            </form>
        </>
    );
};

export default Search;
