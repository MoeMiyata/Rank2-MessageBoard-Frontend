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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1071px)');

    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpenSearchBox(false);  // 画面が大きくなったら閉じる
      }
    };

    // 初期チェック（ロード時）
    if (mediaQuery.matches) {
      setIsOpenSearchBox(false);
    }

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);


  return (
    <>
      <SSearchDiv>
        <SSearchPost type="search" placeholder="検索" name="kwd" onChange={(evt) => setKwd(evt.target.value)}/>
        <SSearchIcon type="submit" onClick={onSearchPostClick}>
          <i className="fas fa-search" style={{scale: 1.5}} ></i>
        </SSearchIcon>
      </SSearchDiv> 

      { isOpenSearchBox && (
        <SMobileSearchBoxContainer>
          <SMobileSearchBox>
            <SSearchPost type="search" placeholder="検索" name="kwd" onChange={(evt) => setKwd(evt.target.value)}/>
          </SMobileSearchBox>
        </SMobileSearchBoxContainer>
      )}
      <SMobileSearchButton onClick={onSwitchMobileSearchBoxClick}>
        <i className="fas fa-search" ></i>
      </SMobileSearchButton>
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
`;

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
`;

const SSearchIcon = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border: none;
`;

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
      scale: 2;
    }
  }
`;

const SMobileSearchBoxContainer = styled.div`
  display: inline-block;
  justify-content: center;
`;

const SMobileSearchBox = styled.div`
  position: fixed;
  width: 74%;
  top: 67px;
  left: 61%;
  transform: translate(-50%, -50%);
  background-color: rgb(34, 34, 34);
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
  box-shadow: rgb(170, 170, 170) 0px 8px 8px;

  @media (max-width: 768px) {
    left: 50%;
    width: 90%;
  }
`;