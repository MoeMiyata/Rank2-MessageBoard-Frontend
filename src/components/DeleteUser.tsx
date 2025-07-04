import React, { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../providers/UserProvider.tsx";
import { deleteUser } from "../api/User.tsx";
import { useNavigate } from "react-router-dom";

export const DeleteUser = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    
    const onSwitchDialogClick = () => {
        setIsOpenDialog(!isOpenDialog)
    }

    const onDeleteUserClick = async () => {
      console.log("delete user")
      onSwitchDialogClick()
      await deleteUser(userInfo.token, userInfo.id);
      navigate("/")
    }

    return (
      <>
        <SDeleteUserButton type="button" onClick={onSwitchDialogClick}>
            Delete account
        </SDeleteUserButton>
        { isOpenDialog && (
          <SDeleteDialogContainer>
            <SDeleteDialog>
              <p style={{ marginBottom: 0 }}>アカウントを削除しますか？</p>
              <p style={{ marginTop: 0 , fontSize: "small"}}>※ 削除後この操作は取り消せません</p>
              <SDeleteDialogButton buttonText="削除" onClick={onDeleteUserClick}>削除</SDeleteDialogButton>
              <SDeleteDialogButton buttonText="キャンセル" onClick={onSwitchDialogClick}>キャンセル</SDeleteDialogButton>
            </SDeleteDialog>
          </SDeleteDialogContainer>
        )}
      </>
    )
}

const SDeleteUserButton = styled.button`
  position: absolute;
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

  @media (max-width: 768px) {
    bottom: 90px;
  }
`;

const SDeleteDialogContainer = styled.div`
  display: inline-block;
  justify-content: center;
`;

const SDeleteDialog = styled.div`
  position: fixed;
  bottom: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background-color: #f8f8f8;
  width: 300px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;

  @media (max-width: 768px) {
    bottom: 2%;
  }
`;

const SDeleteDialogButton = styled.button<{ buttonText: string }>`
  border: none;
  border-radius: 5px;
  // background-color: lightblue;
  background-color:  #f8f8f8;
  // padding: 2px 10px;
  margin: ${({ buttonText }) => buttonText === "削除" ? "2px 30px 2px 30px" : "2px 10px 2px 30px"};
  cursor: pointer;

  &:hover {
    color: #5AA1FA;
  }
`;