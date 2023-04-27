import styled from "styled-components";
import Checked from "../../base/icons/checked";
import {Image} from "../../base/Image";
import React from "react";

const OverlapImage = styled(Checked)`
    z-index: 2;
    position: absolute;
    top: 10px;
    left: 20px;      
`;
const Card = styled.button`
    outline: none;
    border: none;
    animation: 2s ease-out 0s 1 slideIn;

    @keyframes slideIn {
      20% {
        transform: translateX(0);
      }
      0% {
        transform: translateX(-20%);
      }
    }  
    &:focus {
       border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "50%")};
       border: 2px solid #43A047; 
    }
`;

export const FilterCard = ({character, isSelected, onFilterChange}) => {
    const handleClick = (event) => {
        event.preventDefault();
        onFilterChange(character);
    };
    return <Card
        title={character.name}
        key={character.id}
        onClick={handleClick}
        style={{
            position: "relative",
            cursor: "pointer",
            backgroundColor: "transparent",
        }}>
        {isSelected && <OverlapImage/>}
        <Image isSelected={isSelected} width={"80px"} height={"80px"} borderRadius={"50%"}
               src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name}/>
    </Card>
};