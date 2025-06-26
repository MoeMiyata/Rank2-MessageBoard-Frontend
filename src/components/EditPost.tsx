import React, { useContext } from "react"
import styled from "styled-components"

import { LoginUserContext } from "../providers/LoginUserProvider.tsx";


export const EditPost = (props: any) => {
    const { editId, postUserName, isEditPost, isEditPostRef, setIsEditPost, editedContent } = props;

    const { loginUser } = useContext(LoginUserContext);

    const onEditPostClick = async() => {
        if (!isEditPostRef.current) {
            setIsEditPost(true); // 編集モードに入る
        }
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

  @media (max-width: 768px) {
    margin-top: 8px;
    margin-left: 0px;
  }
`