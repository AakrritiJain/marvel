import React from "react";
import styled from "styled-components";
import {Image} from "../../base/Image";

const StyledCard = styled.div`
    width: 195px;
    height: 250px; 
    &:focus {
       border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
       border: 2px solid #43A047; 
    }
`

const Details = styled.div`
    padding: 10px 5px;
    background-color: #313030;
    color: white;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    gap: 2px;
    & p {
        width: 80%;
        overflow: hidden;
        text-overflow: clip; 
        white-space: nowrap;
    } 
`;

export const ComicCard = React.memo(({comic}) => {
    const title = comic.title.split("#")[0];
    return <StyledCard tabIndex={0}>
        <Image width={"195px"} height={"200px"} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title}/>
        <Details>
            <p>{title}</p>
            <span style={{color: "yellow"}}>#{comic.issueNumber}</span>
        </Details>
    </StyledCard>
});