import React, { useContext } from "react"
import styled from "styled-components"

import { UserContext } from "../providers/UserProvider.tsx";
import { deletePost, getList } from "../api/Post.tsx";
import { ReloadPage } from "./ReloadPage.tsx";


export const DeletePost = (props: any) => {
    const { deleteid } = props;

    const { userInfo } = useContext(UserContext);

    // 対象のポストのみ削除してリロードする関数
    const deletePostReload = async() => {
        await deletePost(userInfo.token, deleteid);
        ReloadPage()
    }

    const onDeletePostClick = () => {
        deletePostReload()
        console.log("post.id:", deleteid, "のメッセージ削除");
    }

    return <SDeletePostButton onClick={onDeletePostClick}>削除</SDeletePostButton>
}

const SDeletePostButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
`