// import React, { useState, useContext } from "react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";
import { getList } from "../api/Post.tsx";

export const SearchPost = () => {
    const { userInfo } = useContext(UserContext);
    const { setPostList } = useContext(PostListContext);
    const { pageNumber } = useContext(PageLinkContext);
    const { kwd, setKwd } = useContext(SearchPostContext);
    // ポスト一覧を取得する関数
    const getSearchPostList = async() => {
        const posts = await getList(userInfo.token, pageNumber, kwd);
        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
        posts.forEach((p: any) => {
            postList.push({
            id: p.id,
            user_name: p.user_name,
            content: p.content,
            created_at: new Date(p.created_at),
            });
        });
        }
        setPostList(postList);
    }

    // kwdが変更されるたびに検索結果を更新する
    useEffect(() => {
      getSearchPostList(); // kwdが変更されるたびに実行
    }, [kwd]);  // kwdが変わるたびに実行

    // 検索ボタンを押しても実行可能
    const onSearchPostClick = () => {
      console.log("kwd:", kwd)
      getSearchPostList()
    }


    const [ isOpenSearchBox, setIsOpenSearchBox ] = useState(false);
    const onSwitchMobileSearchBoxClick = () => {
      setIsOpenSearchBox(!isOpenSearchBox)
    }

    return (
      <>
        <SSearchDiv>
          <SSearchPost type="search" placeholder="検索" name="kwd" onChange={(evt) => setKwd(evt.target.value)}/>
          <SSearchIcon type="submit" onClick={onSearchPostClick}>
            {/* <img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/searchicon.png?raw=true" alt="search" width="30" height="30" /> */}
            <i className="fas fa-search" style={{scale: 1.5}} ></i>
          </SSearchIcon>
        </SSearchDiv> 

        {/* <SMobileSearchDiv> */}
        { isOpenSearchBox && (
          <SMobileSearchBoxContainer>
            <SMobileSearchBox>
              <SSearchPost type="search" placeholder="検索" name="kwd" onChange={(evt) => setKwd(evt.target.value)}/>
              {/* <SDeleteDialogButton buttonText="削除" onClick={onDeleteUserClick}>削除</SDeleteDialogButton>
              <SDeleteDialogButton buttonText="キャンセル" onClick={onSwitchDialogClick}>キャンセル</SDeleteDialogButton> */}
            </SMobileSearchBox>
          </SMobileSearchBoxContainer>
        )}
        <SMobileSearchButton onClick={onSwitchMobileSearchBoxClick}>
          {/* <img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/searchicon.png?raw=true" alt="button" width="40" height="40" style={{ margin: "-2px 0px 0px -6.5px" }}/> */}
          <i className="fas fa-search" ></i>
        </SMobileSearchButton>
        {/* </SMobileSearchDiv>  */}
      </>
    )
}


const SSearchDiv = styled.div`
  display: flex;
  position: relative;
  left: 25%;

  @media (max-width: 1070px) {
    display: none;
  }
`

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  margin: 2.5px;
  text-align: center;
  width: 400px;

  @media (max-width: 768px) {
    border-radius: 8px;
    width: 75%;
  }
`

const SSearchIcon = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border: none;
`

// const SMobileSearchDiv = styled.div`
//   display: none;
  
//   @media (max-width: 768px) {
//     display: flex;
//     width: 100%;
//     flex-direction: row;
//     justify-content: flex-end;
//   }
// `

const SMobileSearchButton = styled.button`
  display: none;

  @media (max-width: 1070px) {
    display: flex;
    background-color: #222222;
    color: #FAFAFA;
    position: fixed;
    width: 45px;
    height: 45px;
    top: 45px;
    right: 10px;
    border-radius: 50%;
    cursor: pointer;

    i {
      position: absolute;
      top: 13px;
      left: 13px;
      scole: 2;
    }
  }
`

const SMobileSearchBoxContainer = styled.div`
  display: inline-block;
  justify-content: center;
`;

const SMobileSearchBox = styled.div`
  position: fixed;
  top: 67px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(34, 34, 34);
  width: 90%;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
  box-shadow: rgb(170, 170, 170) 0px 8px 8px;
`;

// const SDeleteDialogButton = styled.button<{ buttonText: string }>`
//   border: none;
//   border-radius: 5px;
//   // background-color: lightblue;
//   background-color:  #f8f8f8;
//   // padding: 2px 10px;
//   margin: ${({ buttonText }) => buttonText === "削除" ? "2px 30px 2px 30px" : "2px 10px 2px 30px"};
//   cursor: pointer;

//   &:hover {
//     color: #5AA1FA;
//   }
// `;



// 投稿一覧を表示し、検索されるとその表示された10個の投稿からListを削って表示する