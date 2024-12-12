// import React from "react";
// import { useState, useContext } from 'react';  // 追加
// import { useNavigate } from 'react-router-dom';  // 追加（ログイン後、メイン画面に遷移する）
// import { UserContext } from "../providers/UserProvider.tsx";  // 追加（SignInコンポーネントでIdとトークンをコンテキストに保存する）
// import { sign_in } from '../api/Auth.tsx';  // 追加

// export default function SignIn() {
//     const navigate = useNavigate();  // navigateオブジェクトを作成する（追加：ログイン後、メイン画面に遷移する）
//     const [userId, setUserId] = useState(''); // ユーザーIDを保持するstate
//     const [pass, setPass] = useState(''); // パスワードを保持するstate
//     const { setUserInfo } = useContext(UserContext);  // setUserInfoの取り出し（追加：SignInコンポーネントでIdとトークンをコンテキストに保存する）

//     const onSignInClick = async () => {
//         console.log('onSignInClick');
//         // sign_in(userId, pass);
//         // // 以下追加（ログイン後、メイン画面に遷移する）
//         const ret = await sign_in(userId, pass);
//         console.log(ret);
//         if (ret && ret.token) { // sign_inのreturn内でret->ret.dataに変更
//             // setUserInfoを使用してコンテキストにユーザー情報を保存する（追加：SignInコンポーネントでIdとトークンをコンテキストに保存する）
//             setUserInfo({
//                 id: ret.user_id,
//                 token: ret.token,
//             });
//             navigate('/main');  // メイン画面に遷移
//         }
//       };

//     return (
//       <div>  
//         <div>
//           <label htmlFor="id">ID</label>  
//           <input id="id" value={userId} type="text" onChange={(evt)=>setUserId(evt.target.value)}/>
//         </div>
  
//         <div>
//           <label htmlFor="password">Password</label>
//           <input id="password" value={pass} type="text" onChange={(evt)=>setPass(evt.target.value)}/>
//         </div>
  
//         <div>
//           <button type="button" onClick={onSignInClick}>Login</button>
//         </div>
//       </div>
//     );  
//   }

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
  const { userInfo, setUserInfo } = useContext(UserContext);

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
        
        <SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
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