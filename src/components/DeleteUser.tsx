import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../providers/UserProvider.tsx";
import { deleteUser } from "../api/Post.tsx";

export const DeleteUser = () => {
    const { userInfo } = useContext(UserContext);

    const onDeleteUserClick = async () => {
      console.log("delete user")
      await deleteUser(userInfo.token, userInfo.id);
    }

    return (
      <>
        <SDeleteUserButton type="button" onClick={onDeleteUserClick}>
            Delete account
        </SDeleteUserButton>
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