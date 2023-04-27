import React, {useCallback, useState} from "react";
import {useQuery} from "react-query";
import {Header} from "../components/Header";
import {debounce, getURL} from "../../utils/helper";
import {ComicsList} from "../components/ComicsList";
import {Filter} from "./Filter";
import styled from "styled-components";
import {Footer} from "../components/Footer";
import {TextBlock} from "../../base/TextBlock";

const StyledContainer = styled.div`
    background-color: rgb(19 15 15 / 80%); 
    height: 100vh; 
`

const LIMIT = 8;

function getSearchString(filters, currentPage, search) {
    let searchStr = `limit=${LIMIT}`;
    if (filters.ids.size > 0)
        searchStr = `${searchStr}&offset=${(currentPage - 1) * LIMIT}&characters=${Array.from(filters.ids).join(",")}`
    if (search.length > 0)
        searchStr = `${searchStr}&offset=${(currentPage - 1) * LIMIT}&title=${search}`
    if (search.length === 0 && filters.ids.size === 0)
        searchStr = `${searchStr}&offset=${(currentPage - 1) * LIMIT}`
    return searchStr;
}

export const Comics = () => {
    const [currentPage, setCurrentPageNumber] = useState(1);
    const [filters, setFilters] = useState({name: new Set(), ids: new Set()});
    const [search, setSearch] = useState("");
    const {isLoading, error, data, refetch, isRefetching} = useQuery('comics', () => {
            let searchStr = getSearchString(filters, currentPage, search);
            return fetch(getURL({
                endpoint: "public/comics",
                search: searchStr
            })).then(res =>
                res.json()
            )
        }
    );

    const onFilterChange = (character) => {
        const newFilters = filters;
        if (newFilters.name.has(character.name))
            newFilters.name.delete(character.name);
        else newFilters.name.add(character.name);
        if (newFilters.ids.has(character.id))
            newFilters.ids.delete(character.id);
        else newFilters.ids.add(character.id);
        setFilters(newFilters);
        setTimeout(() => refetch(), 0);
    };

    const debounceFn = useCallback(debounce(refetch, 1000), []);
    const onSearch = (e) => {
        setSearch(e.target.value);
        debounceFn();
    }

    const onClearFilters = () => {
        setFilters({name: new Set(), ids: new Set()});
        setTimeout(() => refetch(), 0);
    };

    const onPageChange = (page) => {
        setCurrentPageNumber(page);
        setTimeout(() => refetch(), 0);
    };

    if(data?.code === "InvalidCredentials")
        return <div style={{fontSize: "32px"}}>{"Unauthorized! Please provide API key"}</div>;

    return <StyledContainer>
        <Header onSearch={onSearch}/>
        <Filter filters={filters} onFilterChange={onFilterChange} onClearFilters={onClearFilters}/>
        <ComicsList comics={data?.data?.results} isLoading={isLoading} error={error} isRefetching={isRefetching}
                    total={data?.data.total}/>
        <Footer total={Math.floor(data?.data?.total / LIMIT)} currentPage={currentPage} onPageChange={onPageChange}/>
    </StyledContainer>
};
