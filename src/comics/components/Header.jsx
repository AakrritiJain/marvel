import MarvelLogo from "../../base/icons/marvel_logo";
import {SearchInput} from "../../base/searchInput";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      color: white;
      background-color: #f0141e;
      height: 50px;
      width: 100%;
`;

export const Header = ({onSearch}) => {
    return <StyledHeader aria-label={"Marvel"}>
        <MarvelLogo/>
        <SearchInput aria-label={"Search Comics"} placeholder={"Search for comics..."} onSearch={onSearch}/>
    </StyledHeader>
};