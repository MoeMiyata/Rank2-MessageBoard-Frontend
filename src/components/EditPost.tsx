import React, { useContext } from "react"
import styled from "styled-components"

import { UserContext } from "../providers/UserProvider.tsx";
import { updatePost } from "../api/Post.tsx";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";


export const EditPost = (props: any) => {
    const { editId, postUserName, isEditPost, setIsEditPost, editedContent } = props;

    const { userInfo } = useContext(UserContext);
    const { loginUser } = useContext(LoginUserContext);

    const onEditPostClick = async() => {
        console.log("post.id:", editId, "のメッセージ編集");
        console.log("editedContent:", editedContent);
        console.log("isEditPost:", isEditPost);
        // if (!isEditPost) setIsEditPost(true) // Blurとかぶるのでtrueにする時だけ変更
        // else setIsEditPost(true)
        setIsEditPost(!isEditPost)
        await updatePost(userInfo.token, editId, editedContent);
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