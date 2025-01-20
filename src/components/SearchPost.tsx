import React from "react";
import styled from "styled-components";

export const SearchPost = () => {
    return (
        <div>
            <SSearchPost type="search" placeholder="検索"/>
            <input type="submit" value="&#xf002"></input>
        </div> 
    )
}

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  margin: 2.5px;
  text-align: center;
  width: 400px;
`