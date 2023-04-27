import React from "react";
import styled from "styled-components";
import RightArrow from "../../icons/rightArrow";
import LeftArrow from "../../icons/leftArrow";

const StyledNode = styled.button`
    min-width: 30px;
    height: 30px; 
    position: relative;
    border-radius: 2px; 
    outline: none;
    border: ${(props) => (props.isSelected ? "2px solid #43A047" : "none")};
    color: ${(props) => (props.isSelected && "#43A047")};
    
    &:hover, :focus {
        border: 2px solid #43A047;
        color: #43A047; 
    }
    & svg:hover, :focus {
        fill: #43A047; 
    }       
`

const arrowStyles = {position: "absolute", top: "0", right: "0"};

export const Pagination = ({totalPages, currentPage, onPageChange}) => {
    // push first page number
    const nodes = [<StyledNode isSelected={currentPage === 1} onClick={() => onPageChange(1)}>1</StyledNode>];

    // push ellipses if current page not next to first page
    if (currentPage > 2) {
        nodes.push(<StyledNode>...</StyledNode>);
    }

    // push current page
    if (currentPage !== 1 && currentPage !== totalPages)
        nodes.push(<StyledNode isSelected>{currentPage}</StyledNode>);

    // push ellipses if current page not prev to last page
    if (currentPage < totalPages - 1) {
        nodes.push(<StyledNode>...</StyledNode>);
    }

    // push last page number
    nodes.push(<StyledNode isSelected={currentPage === totalPages}
                           onClick={() => onPageChange(totalPages)}>{totalPages}</StyledNode>)

    return <>
        <StyledNode
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            <LeftArrow style={arrowStyles}/>
        </StyledNode>
        {nodes}
        <StyledNode
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            <RightArrow style={arrowStyles}/>
        </StyledNode>
    </>
};