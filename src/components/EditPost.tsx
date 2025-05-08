import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { UserContext } from "../providers/UserProvider.tsx";
import { deletePost, getList } from "../api/Post.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";


export const EditPost = (props: any) => {
    const { editId, postUserName, isEditPost, setIsEditPost } = props;

    // const { userInfo } = useContext(UserContext);
    // const { setPostList } = useContext(PostListContext);
    // const { pageNumber } = useContext(PageLinkContext);
    // const { kwd } = useContext(SearchPostContext);
    const { loginUser } = useContext(LoginUserContext);

    // // ポスト一覧を取得する関数
    // const getPostList = async() => {
    //     const posts = await getList(userInfo.token, pageNumber, kwd);
    //     // getListで取得したポスト配列をコンテキストに保存する
    //     let postList: Array<PostType> = [];
    //     if (posts) {
    //     posts.forEach((p: any) => {
    //         postList.push({
    //         id: p.id,
    //         user_name: p.user_name,
    //         content: p.content,
    //         created_at: new Date(p.created_at),
    //         });
    //     });
    //     }
    //     setPostList(postList);
    // }

    // // 対象のポストのみ削除してリロードする関数
    // const deletePostReload = async() => {
    //     await deletePost(userInfo.token, editId);
    //     getPostList()
    // }

    const onEditPostClick = () => {
        console.log("post.id:", editId, "のメッセージ編集");
        setIsEditPost(!isEditPost)
    }

    return loginUser.name === postUserName ? <SEditPostButton onClick={onEditPostClick}>編集</SEditPostButton> : null
}

const SEditPostButton = styled.button`
//   background-color: #222222;
//   color: #FAFAFA;
  color: #222222;
  border: none;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
  cursor: pointer;

  &:hover {
    color: #FAFAFA;
    back-ground-color: #222222;
  }
`