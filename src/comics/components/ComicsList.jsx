import React from "react";
import styled from "styled-components";
import {ComicCard} from "./ComicCard";
import {TextBlock} from "./TextBlock";

const StyledCardContainer = styled.div`
    margin: 0 23%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between; 
    gap: 15px;  
`

export const ComicsList = ({comics, isLoading, isRefetching, error}) => {
    if (isLoading || isRefetching) return <TextBlock>{"Loading..."}</TextBlock>;

    if (error) return 'An error has occurred: ' + error.message;
    return <div>
        <StyledCardContainer>
            {comics?.map((comic) => {
                return <ComicCard key={comic.id} comic={comic}/>
            })}
            {comics.length === 0 && <TextBlock>{"No Record Found, Please Reset Filters or Search"}</TextBlock>}
        </StyledCardContainer>
    </div>
}