import React, { useState } from "react";
import styled from "styled-components";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { requestEmailVerification } from "../api/Email.tsx";
import { CAPTCHA } from "./reCAPTCHA.tsx";


export default function SignUpLayout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // サインアップボタンが押せるかの判定
  const isFormValid = name !== "" && email !== "" && pass !== "";

  const onSignUpClick = async () => {
      console.log('name:', name, '\nemail:', email, '\npassword:', pass);

      const error = await requestEmailVerification(name, email, pass);
      console.log("requestEmailVerification:", error);
      toast('認証メールを送信しました', { icon: <i className="fas fa-check-circle" style={{color: 'green'}}></i> })
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

      {/* CAPTCHA */}
      <CAPTCHA />

      <SSignInRow>
        <SLoginButton type="button" onClick={onSignUpClick} disabled={!isFormValid}>
          Create New Account
        </SLoginButton>
      </SSignInRow>
    </SSignInFrame>

    <SSignInRow style={{ marginTop: "25px" }}>
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
  // height: 100%;
  height: 32px;
  box-shadow: 0px 4px 4px #AAAAAA;
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
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  // dixplay: inline-block;
  margin-top: 20px;
  margin-bottom: 15px;
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
  width: 25%;
  vertical-align: top;
  margin-left: 4px;
  text-align: left;
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