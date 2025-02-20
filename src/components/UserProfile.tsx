import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";

export default function UserProfile() {
  const navigate = useNavigate();
  const { loginUser } = useContext(LoginUserContext)

  const onBackToMainClick = async () => {
    navigate("/main");
  }
  console.log('loginUser:', loginUser)

  return (
    <>
        <SHeader>
            <SLogo>User Profile</SLogo>
        </SHeader>

        <SUserProfileFrame>
            <SSignInRow>
                {/* <h1>Name: {loginUser.name}</h1> */}
                <h1>Name</h1>
            </SSignInRow>

            <SSignInRow>
                {/* <h1>Email: {loginUser.email}</h1> */}
                <h1>Email</h1>
            </SSignInRow>

            <SSignInRow>
                {/* <h1>Hash: {loginUser.hash}</h1> */}
                <h1>Hash</h1>
            </SSignInRow>
        </SUserProfileFrame>

        <SSignInRow>
            <SMainButton type="button" onClick={onBackToMainClick}>
                Back to Main
            </SMainButton>
        </SSignInRow>
    </>
  );
}


const SHeader = styled.div`
  background-color: #222222;
  flex-direction: row;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`;

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justyify-content: start;
`;

const SUserProfileFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  dixplay: inline-block;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SMainButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;