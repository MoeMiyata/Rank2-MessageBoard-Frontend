import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/User.tsx";


export default function SignInLayout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // サインアップボタンが押せるかの判定
  const isFormValid = name !== "" && email !== "" && pass !== "";

  const onSignUpClick = async () => {
      console.log('name:', name, '\nemail:', email, '\npassword:', pass);
      
      const error = await createUser(name, email, pass);

      if (error) {
        alert(error.response.data.message);
      } else {
        //　アカウント作成に成功したらログイン画面に移行
        navigate("/");
      }
  };

  const onBackToLoginClick = async () => {
    navigate("/");
  };
      
  return (
    <>
    <SHeader>
        <SLogo>Sign Up Page</SLogo>
    </SHeader>

    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="name">Name</label>
        </SSignInLabel>
        
        <SSignInInput>
          <input
            id="name"
            value={name}
            type="name"
            onChange={(evt) => setName(evt.target.value)}
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
            value={email}
            type="email"
            onChange={(evt) => setEmail(evt.target.value)}
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
            value={pass}
            type="password"
            onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>

      <SSignInRow>
        {/* <SLoginButton type="button" onClick={onSignInClick}> */}
        <SLoginButton type="button" onClick={onSignUpClick} disabled={!isFormValid}>
          Create New Account
        </SLoginButton>
      </SSignInRow>
    </SSignInFrame>

    <SSignInRow>
    <SLoginButton type="button" onClick={onBackToLoginClick}>
        Back to Login
    </SLoginButton>
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
`

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justyify-content: start;
`

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

  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed; 
  }
`;