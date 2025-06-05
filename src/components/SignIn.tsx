import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { sign_in } from "../api/Auth.tsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const { setUserInfo } = useContext(UserContext);
  
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const onSignInClick = async () => {
    const ret = await sign_in(userId, pass);
    console.log(ret);

    if (ret && ret.token) {
      console.log(`Sign in success. ${ret.user_id}, ${ret.token}`);
      setUserInfo({
        id: ret.user_id,
        token: ret.token,
      });
      navigate("/main");
    }
  };

  return (
    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>
        
        <SSignInData>
          <SSignInInput>
            <input
              id="id"
              value={userId}
              type="text"
              onChange={(evt) => setUserId(evt.target.value)}
            />
          </SSignInInput>
        </SSignInData>
      </SSignInRow>

      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>

        <SSignInData>
          <SSignInInput>
            <input
              id="password"
              value={pass}
              type={isRevealPassword ? 'text' : 'password'}
              onChange={(evt) => setPass(evt.target.value)}
            />
            <span onClick={togglePassword}  role="presentation" className="eye-icon">
              <i className={isRevealPassword ? "fas fa-eye" : "fas fa-eye-slash"} />
            </span>
          </SSignInInput>
        </SSignInData>
      </SSignInRow>

      <SSignInRow>
        <SLoginButton type="button" onClick={onSignInClick}>
          Login
        </SLoginButton>
      </SSignInRow>
    </SSignInFrame>
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
  position: relative;
  display: inline-block;
  // width: auto;
  vertical-align: top;
  margin-left: 4px;

  input {
    padding-right: 30px; /* アイコン分の余白 */
  }

  .eye-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
  }
`;

const SSignInData = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: left;
  margin-right: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;