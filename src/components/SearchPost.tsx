import React from "react";
import styled from "styled-components";

export const SearchPost = () => {
    return (
        <SSearchDiv>
            <SSearchPost type="search" placeholder="検索"/>
            <SSearchIcon type="submit"><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/searchicon.png?raw=true" alt="search" width="30" height="30" /></SSearchIcon>
        </SSearchDiv> 
    )
}


const SSearchDiv = styled.div`
//   display: flex;
`

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  margin: 2.5px;
  text-align: center;
  width: 400px;
`

const SSearchIcon = styled.input`
  filter: hue-rotate(180deg);
`