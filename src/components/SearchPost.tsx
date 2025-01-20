import React from "react";
import styled from "styled-components";

export const SearchPost = () => {
    return <SSearchPost type="search" placeholder="検索"></SSearchPost>
}

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
`