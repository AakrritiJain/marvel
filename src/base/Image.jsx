import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
    width: ${(props) => (props.width ? props.width : "25px")};
    height: ${(props) => (props.height ? props.height : "25px")};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
    opacity: ${(props) => (props.isSelected ? "0.5" : "1")};
    border: ${(props) => (props.isSelected && "2px solid #43A047")};
    
    &:hover {
       border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
       border: 2px solid #43A047; 
    }
`;

export const Image = (props)  => {
    return <StyledImage src={props.src} {...props}/>
}