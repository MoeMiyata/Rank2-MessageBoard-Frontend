import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


export default function SignInLayout() {
  const navigate = useNavigate();

  const onSignUpClick = async () => {
    navigate("/");
  };
      
  return (
    <>
    <h1>ユーザ登録画面</h1>

    <SSignInRow>
    <SLoginButton type="button" onClick={onSignUpClick}>
        Back to Login
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