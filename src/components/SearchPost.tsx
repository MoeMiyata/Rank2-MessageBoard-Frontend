import React from "react";
import styled from "styled-components";

export const SearchPost = () => {
    // const onSearchPostClick = () => {
    //     console.log()
    // }

    return (
        // <SSearchForm>
            <SSearchDiv>
                <SSearchPost type="search" placeholder="検索" name="q"/>
                <SSearchIcon type="submit"><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/searchicon.png?raw=true" alt="search" width="30" height="30" /></SSearchIcon>
            </SSearchDiv> 
        // </SSearchForm>
        
    )
}


const SSearchDiv = styled.div`
  display: flex;
  position: relative;
  left: 25%;
`

const SSearchForm = styled.form`
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
`


// 投稿一覧を表示し、検索されるとその表示された10個の投稿からListを削って表示する