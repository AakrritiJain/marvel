import React from "react";
import styled from "styled-components";
import Search from "../../icons/search";

const StyledIcon = styled(Search)`
    position: absolute;
    margin: 2px 4px;
`;

const StyledSearchInput = styled.input`
    padding: 0 40px;
    height: 30px;
    color: black;
`

export const SearchInput = ({placeholder = "Type to search...", onSearch}) => {
    return <div style={{position: "relative"}}>
        <StyledIcon/>
        <StyledSearchInput placeholder={placeholder} type={"text"} onChange={onSearch}/>
    </div>
}