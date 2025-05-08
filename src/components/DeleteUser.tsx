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
    }

    return (
      <>
        <SDeleteUserButton type="button" onClick={onDeleteUserClick}>
            Delete account
        </SDeleteUserButton>
        <button onClick={onClickSwitchDialog}>
          { isOpenDialog && (
              <div>
                  <h2>Delete Dialog</h2>
                  <p>これはダイアログの内容です。</p>
                  <button onClick={onClickSwitchDialog}>閉じる</button>
              </div>
          )}
        </button>
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