import React from 'react';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { SearchPost } from './SearchPost.tsx';
import { LoginUserContext } from '../providers/LoginUserProvider.tsx';

export default function Header() {
  const navigate = useNavigate();
  // const [ userName, setUserName ] = useState("");
  const { loginUser } = useContext(LoginUserContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ id: 0, token: "" });
    navigate("/");
  };

  // useEffect(() => {
  //   const myGetUser = async () => {
  //     const user = await getUser(userInfo.id, userInfo.token);
  //     setUserName(user.name);
  //   };
  //   myGetUser();
  // }, []);

  const onUserProfileClick = () => {
    console.log('ユーザ情報閲覧');
    navigate("/userprofile");
  }

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>

      {/* 検索ボタンの配置 */}
      <SearchPost/>

      <SRightItem>
        <SName onClick={onUserProfileClick}>{loginUser.name}</SName>
        <SLogout onClick={logout}>ログアウト</SLogout>
      </SRightItem>
    </SHeader>
  )
}

const SHeader = styled.div`
  background-color: #222222;
  display: flex;
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

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
  cursor: pointer;  // ポインタ追加
`

const SLogout = styled.div`
  // padding-top: 8px;
  padding-top: 6px;
  padding-bottom: 8px;
  text-align: center;
  cursor: pointer;  // ポインタ追加
`