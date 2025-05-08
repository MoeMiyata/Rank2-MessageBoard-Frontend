import React, { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../providers/UserProvider.tsx";
import { deleteUser } from "../api/Post.tsx";
import { useNavigate } from "react-router-dom";

export const DeleteUser = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    // const onDeleteUserClick = async () => {
    //   console.log("delete user")
    //   await deleteUser(userInfo.token, userInfo.id);
    //   navigate("/")
    // }

    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    
    const onClickSwitchDialog = () => {
        setIsOpenDialog(!isOpenDialog)
    }

    const onDeleteUserClick = async () => {
      console.log("delete user")
      onClickSwitchDialog()
    //   await deleteUser(userInfo.token, userInfo.id);
      navigate("/")
    }

    return (
      <>
        <SDeleteUserButton type="button" onClick={onClickSwitchDialog}>
            Delete account
        </SDeleteUserButton>
        { isOpenDialog && (
          <SDeleteDialog>
            <p style={{ marginBottom: 0 }}>アカウントを削除しますか？</p>
            <p style={{ marginTop: 0 , fontSize: "small"}}>※削除後この操作は取り消せません。</p>
            <SDeleteDialogButton onClick={onDeleteUserClick}>削除</SDeleteDialogButton>
            <SDeleteDialogButton onClick={onClickSwitchDialog}>キャンセル</SDeleteDialogButton>
          </SDeleteDialog>
          )}
      </>
    )
}

const SDeleteUserButton = styled.button`
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background: none;
  color: #5aa1fa;
  text-decoration: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline; 
  }
`;

const SDeleteDialog = styled.div`
  background-color: #f8f8f8;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SDeleteDialogButton = styled.button`
  border: none;
  border-radius: 5px;
  // background-color: lightblue;
  background-color:  #f8f8f8;
  padding: 2px 10px;
`;