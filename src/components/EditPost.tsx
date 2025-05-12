import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { UserContext } from "../providers/UserProvider.tsx";
import { deletePost, getList, updatePost } from "../api/Post.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";


export const EditPost = (props: any) => {
    const { editId, postUserName, isEditPost, setIsEditPost, editedContent } = props;

    const { userInfo } = useContext(UserContext);
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

    const onEditPostClick = async() => {
        console.log("post.id:", editId, "のメッセージ編集");
        console.log("editedContent:", editedContent);
        // if (isEditPost) setIsEditPost(false)
        // else setIsEditPost(true)
        setIsEditPost(!isEditPost)
        await updatePost(userInfo.token, editId, editedContent); ///////////////////// ここに置いてるから編集内容が反映されない？
    }

    return loginUser.name === postUserName ? <SEditPostButton isEditPost={isEditPost} onClick={onEditPostClick}>編集</SEditPostButton> : null
}

const SEditPostButton = styled.button<{ isEditPost: boolean }>`
//   background-color: #222222;
//   color: #FAFAFA;
  color: ${ ({ isEditPost }) => isEditPost ? "#FAFAFA" : "#222222"};
  background-color: ${ ({ isEditPost }) => isEditPost ? "#222222" : "none"};
  border: none;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
  cursor: pointer;

  &:hover {
    color: #FAFAFA;
    background-color: #222222;
  }
`