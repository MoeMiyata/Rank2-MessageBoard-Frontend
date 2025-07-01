import React, { useState } from 'react';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { SearchPost } from './SearchPost.tsx';
import { LoginUserContext } from '../providers/LoginUserProvider.tsx';
import { VolumeContext } from '../providers/VolumeProvider.tsx';

export default function Header() {
  const navigate = useNavigate();
  // const [ userName, setUserName ] = useState("");
  const { loginUser } = useContext(LoginUserContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { isMute, setIsMute } = useContext(VolumeContext);

  const logout = () => {
    setUserInfo({ id: 0, token: "" });
    navigate("/");
  };

  const onUserProfileClick = () => {
    console.log('ユーザ情報閲覧');
    navigate("/userprofile");
  }

  const onVolumeClick = () => {
    console.log('音量切り替え');
    setIsMute(!isMute);
  }

  const [menuOpen, setMenuOpen] = useState(false); // メディアクエリ（スマホ用）

  return (
    <SHeader>
      <SLogo>Boardemy</SLogo>

      {/* 検索ボタンの配置 */}
      <SearchPost/>

      <SMobileRightItem>
        <SBurgerMenu onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-cog"></i>
        </SBurgerMenu>
      </SMobileRightItem>

      <SRightItem>
        <SName onClick={onUserProfileClick}>{loginUser.name}</SName>
        <SVolume onClick={onVolumeClick}><i className={isMute ? "fas fa-bell-slash" : "fas fa-bell"}></i></SVolume>
        <SLogout onClick={logout}>ログアウト</SLogout>
      </SRightItem>


      {menuOpen && (
        <SMobileMenu>
          <SName onClick={() => { onUserProfileClick(); setMenuOpen(false); }}>{loginUser.name}</SName>
          <SVolume onClick={() => { onVolumeClick(); setMenuOpen(false); }}>{ isMute ? "sound OFF" : "sound ON" }</SVolume>
          <SLogout onClick={() => { logout(); setMenuOpen(false); }}>ログアウト</SLogout>
        </SMobileMenu>
      )}
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
  position: relative;
`;

const SLogo = styled.div`
  padding-top: 2px;
  padding-bottom: 8px;
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  // padding-top: 8px;
  // padding-bottom: 8px;
  // text-align: center;
  justify-content: start;
`;

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;

  @media (max-width: 768px) {
    display: none;
  };
`

const SMobileRightItem = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const SName = styled.div`
  padding-top: 7px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
  cursor: pointer;  // ポインタ追加
`;

const SVolume = styled.div`
  padding-top: 7px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
  cursor: pointer;  // ポインタ追加
`;

const SLogout = styled.div`
  // padding-top: 8px;
  padding-top: 5px;
  padding-bottom: 8px;
  text-align: center;
  cursor: pointer;  // ポインタ追加
`;

const SBurgerMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  padding: 2px 8px 2px 8px;

  @media (max-width: 768px) {
    display: block;
    color: white;
  }
`;

const SMobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  color: #f8f8f8;
  position: absolute;
  top: 48px; // ヘッダー下に出す
  right: 8px;
  z-index: 1000;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px;

  & > div {
    margin-bottom: 8px;
    cursor: pointer;
  }
`;