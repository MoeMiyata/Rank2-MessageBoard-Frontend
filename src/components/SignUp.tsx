import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { sign_in } from "../api/Auth.tsx";

export default function SignUp() {
  const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [pass, setPass] = useState("");
//   const { userInfo, setUserInfo } = useContext(UserContext);

  const onSignUpClick = async () => {
    // const ret = await sign_in(userId, pass);
    // console.log(ret);

    // if (ret && ret.token) {
    //   console.log(`Sign up success. ${ret.user_id}, ${ret.token}`);
    //   setUserInfo({
    //     id: ret.user_id,
    //     token: ret.token,
    //   });
      navigate("/main");
    // }
  };

  return (
    <SSignInRow>
    <SLoginButton type="button" onClick={onSignUpClick}>
        Sign up
    </SLoginButton>
    </SSignInRow>
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