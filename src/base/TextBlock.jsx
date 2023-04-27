import React from "react";
import styled from "styled-components";

const StyledTextBlock = styled.p`
    margin: 0 20%;
    color: white; 
    font-size: 16px;
`

export const TextBlock = ({children}) => {
    return <StyledTextBlock>{children}</StyledTextBlock>;
}