import React, {useState} from "react";
import {useQuery} from "react-query";
import styled from "styled-components";
import {getURL} from "../../utils/helper";
import {Image} from "../../base/Image";
import Checked from "../../base/icons/checked";
import LeftArrow from "../../base/icons/leftArrow";
import RightArrow from "../../base/icons/rightArrow";
import {TextBlock} from "../../base/TextBlock";

const OverlapImage = styled(Checked)`
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 20px;      
`;

const FilterCard = ({character, isSelected, onFilterChange}) => {
    const handleClick = (event) => {
        event.preventDefault();
        onFilterChange(character);
    };
    return <button
        key={character.id}
        onClick={handleClick}
        style={{
            position: "relative",
            cursor: "pointer",
            backgroundColor: "transparent",
            outline: "none",
            border: "none"
        }}>
        {isSelected && <OverlapImage/>}
        <Image isSelected={isSelected} width={"80px"} height={"80px"} borderRadius={"50%"}
               src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name}/>
    </button>
};

const StyledContainer = styled.div`
    height: 100px; 
    padding: 8px;
    background-color: rgb(19 15 15 / 60%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`
const StyledFilter = styled.div`
    margin: 0 23%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    color: white;
    font-size: 18px;  
    padding: 3px 0; 
`

const StyledButton = styled.button`
    background-color: white;
    color: black; 
    font-size: 12px;
    height: 30px;
    border-radius: 5px;
`

const StyledArrow = styled.button`
    background-color: transparent; 
    outline: none;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    
    &:hover, :focus {
      background-color: #252a25;
    }
    
    & svg { 
        opacity: ${(props) => (props.disabled ? "0.3" : "1")};
    }    
`

const LIMIT = 8;
// 157

export const Filter = React.memo(({onFilterChange, filters, onClearFilters}) => {
    const [currentPage, setCurrentPageNumber] = useState(1);
    const {isLoading, error, data, refetch, isRefetching} = useQuery('characters', () =>
        fetch(getURL({
            endpoint: "public/characters",
            search: `offset=${(currentPage - 1) * LIMIT}&limit=${LIMIT}`
        })).then(res =>
            res.json()
        )
    );

    if (error) return 'An error has occurred: ' + error.message;

    const characters = data?.data?.results || [];
    const totalPage = Math.floor(data?.data?.total / LIMIT);
    const onPageChange = (page) => {
        setCurrentPageNumber(page);
        setTimeout(() => refetch(), 0);
    };

    return <>
        <StyledContainer>
            {(isLoading || isRefetching) ? <TextBlock>Loading...</TextBlock>
                : (<>
                    <StyledArrow disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                        <LeftArrow fill={"#43A047"} width={"50px"} height={"50px"}/>
                    </StyledArrow>
                    {characters?.map((character) => {
                        return <FilterCard
                            key={character.id}
                            onFilterChange={onFilterChange}
                            character={character}
                            isSelected={filters.name.has(character.name)}
                        />
                    })}
                    <StyledArrow disabled={currentPage === totalPage} onClick={() => onPageChange(currentPage + 1)}>
                        <RightArrow fill={"#43A047"} width={"50px"} height={"50px"}/>
                    </StyledArrow>
                </>)}

        </StyledContainer>
        <StyledFilter>
            <p>{`Explore - ${filters.name.size > 0 ? Array.from(filters.name).join(", ") : "All"}`}</p>
            <StyledButton onClick={onClearFilters}>{"Clear All Filters"}</StyledButton>
        </StyledFilter>
    </>
});