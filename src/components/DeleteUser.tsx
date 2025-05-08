import React from "react";
import styled from "styled-components";

export const DeleteUser = () => {
    const onUserProfileDeleteUserClick = () => {
      console.log("delete user")
    }

    return (
      <>
        <SDeleteUserButton type="button" onClick={onUserProfileDeleteUserClick}>
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