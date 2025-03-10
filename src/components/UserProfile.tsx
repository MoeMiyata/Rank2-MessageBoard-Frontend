import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";

export default function UserProfile() {
  const navigate = useNavigate();
  const { loginUser } = useContext(LoginUserContext);

  const [isEditMode, setIsEditMode] = useState(false);

  const onBackToMainClick = async () => {
    navigate("/main");
  }
  console.log('loginUser:', loginUser)

  const onEditModeClick = async () => {
    setIsEditMode(!isEditMode);
  }

  return (
    <>
        <SHeader>
            <SLogo>User Profile</SLogo>
            <SRightItem>
              <SEdit onClick={onEditModeClick}>編集</SEdit>
            </SRightItem>
        </SHeader>

        <SSignInRow>
          {isEditMode ? "登録内容を編集してください。" : null}
        </SSignInRow>

        <SUserProfileFrame>
            <SSignInRow>
                {/* <h1>Name: {loginUser.name}</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Name：</label>
                    <input type="text" placeholder={loginUser.name}/>
                  </div>
                  : <h1>名前: {loginUser.name}</h1>}
            </SSignInRow>

            <SSignInRow>
                {/* <h1>メールアドレス: {loginUser.email}</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Email：</label>
                    <input type="text" placeholder={loginUser.email}/>
                  </div>
                  : <h1>メールアドレス: {loginUser.email}</h1>
                }
            </SSignInRow>

            <SSignInRow>
                {/* <h1>ハッシュ: {loginUser.hash}</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Password：</label>
                    <input type="text" />
                  </div>
                  : <h1>ハッシュ: {loginUser.hash}</h1>}
            </SSignInRow>

            <SSignInRow>
                {/* <h1>生年月日:  登録なし</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Birthday：</label>
                    <input type="text" placeholder="登録なし"/>
                  </div>
                  : <h1>生年月日:  登録なし</h1>}
            </SSignInRow>

            <SSignInRow>
                {/* <h1>住所: 登録なし</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Adderess：</label>
                    <input type="text" placeholder="登録なし"/>
                  </div>
                  : <h1>住所: 登録なし</h1>}
            </SSignInRow>

            <SSignInRow>
                {/* <h1>電話番号: 登録なし</h1> */}
                {isEditMode ? 
                  <div>
                    <label>Revised Phone number：</label>
                    <input type="text" placeholder="登録なし"/>
                  </div>
                  : <h1>電話番号: 登録なし</h1>
                }
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
  display: flex;
  flex-direction: row;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
  justify-content: space-between;
`;

const SRightItem = styled.div`
  display: flex;
  flex-direction: row;
`

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  flex-grow: 1;  /* 残りのスペースを埋める */
`;

const SEdit = styled.div`
  // padding-top: 8px;
  padding-top: 6px;
  padding-bottom: 8px;
  text-align: center;
  justify-content: end;
  cursor: pointer;  // ポインタ追加
`

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
