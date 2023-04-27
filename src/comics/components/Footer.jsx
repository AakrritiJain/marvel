import React from "react";
import styled from "styled-components";
import {Pagination} from "../../base/Pagination";

const StyledPageContainer = styled.div`
    margin: 3% 23%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 8px;
    position: absolute;
    bottom: 0;
    left: 0; 
    right: 0; 
`

export const Footer = ({total, currentPage, onPageChange}) => {
    return <StyledPageContainer>
        <Pagination totalPages={total} currentPage={currentPage} onPageChange={onPageChange}/>
    </StyledPageContainer>
}