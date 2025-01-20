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
  display: flex;
  position: relative;
  left: 25%;
`

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  margin: 2.5px;
  text-align: center;
  width: 400px;
`

const SSearchIcon = styled.button`
  background-color: #222222;
  border: none;
//   filter: invert(100%);
`

// const SPageLinkNextButton = styled.button`
//   background-color: #222222;
//   color: #FAFAFA;
//   position: fixed;
//   top: 45px;
//   right: 10px;
//   padding: 3px 5px 0px 4px;
//   border-radius: 50%;
// // `