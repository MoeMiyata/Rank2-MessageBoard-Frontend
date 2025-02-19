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
    <h1>Sign Up Page</h1>

    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="name">Name</label>
        </SSignInLabel>
        
        <SSignInInput>
          <input
            id="name"
            // value={userId}
            type="text"
            // onChange={(evt) => setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="password"
            // value={pass}
            type="password"
            // onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="email">Email</label>
        </SSignInLabel>

        <SSignInInput>
          <input
            id="email"
            // value={pass}
            type="email"
            // onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        {/* <SLoginButton type="button" onClick={onSignInClick}> */}
        <SLoginButton type="button">
          Create New Account
        </SLoginButton>
      </SSignInRow>
    </SSignInFrame>

    <SSignInRow>
    <SLoginButton type="button" onClick={onSignUpClick}>
        Back to Login
    </SLoginButton>
    </SSignInRow>
    </>
  );
}

const SSignInFrame = styled.div`
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

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;