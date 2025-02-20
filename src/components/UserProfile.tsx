import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserProfile() {
  const navigate = useNavigate();

  const onBackToMainClick = async () => {
    navigate("/main");
  }

  return (
    <>
        <h1>ユーザ情報一覧</h1>

        <SSignInRow>
        <SLoginButton type="button" onClick={onBackToMainClick}>
            Back to Main
        </SLoginButton>
        </SSignInRow>
    </>
  );
}


const SSignInRow = styled.div`
  dixplay: inline-block;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;