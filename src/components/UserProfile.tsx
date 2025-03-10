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

        <SUserProfileRow>
          {isEditMode ? "登録内容を編集してください。" : null}
        </SUserProfileRow>

        <SUserProfileFrame>
            <SUserProfileRow>
                {/* <h1>Name: {loginUser.name}</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="name">Name</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                      <input
                        id="name"
                        // value={pass}
                        type="name"
                        placeholder={loginUser.name}
                        // onChange={(evt) => setPass(evt.target.value)}
                    />
                    </SUserProfileInput>
                  </>
                  :
                  <>
                    <SUserProfileLabel>
                      Name: 
                    </SUserProfileLabel>
                    <SUserProfileLabel>
                    {loginUser.name}
                    </SUserProfileLabel>
                    {/* <span>{loginUser.name}</span> */}
                  </>
                  }
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>メールアドレス: {loginUser.email}</h1> */}
                {isEditMode ? 
                  // <p>
                  //   <label>メールアドレス：</label>
                  //   <input type="text" placeholder={loginUser.email}/>
                  // </p>
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="email">Email</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                      <input
                        id="email"
                        type="email"
                        placeholder={loginUser.email}
                    />
                    </SUserProfileInput>
                  </>
                  : 
                  // <p>メールアドレス: {loginUser.email}</p>
                  <>
                    <SUserProfileLabel>
                      Email: 
                    </SUserProfileLabel>
                    <span>{loginUser.email}</span>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>ハッシュ: {loginUser.hash}</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                     <label htmlFor="password">Password</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                     <input
                        id="password"
                        type="password"
                    />
                    </SUserProfileInput>
                  </>
                  : <p>ハッシュ: {loginUser.hash}</p>}
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>生年月日:  登録なし</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="birthday">Date of birth</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                      <input
                          id="birthday"
                          type="birthday"
                          placeholder="登録なし"
                      />
                    </SUserProfileInput>
                  </>
                  : <p>生年月日:  登録なし</p>}
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>住所: 登録なし</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="address">Address</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                      <input
                          id="address"
                          type="address"
                          placeholder="登録なし"
                      />
                    </SUserProfileInput>
                  </>
                  : <p>住所: 登録なし</p>}
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>電話番号: 登録なし</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="phonenumber">Phone number</label>
                    </SUserProfileLabel>

                    <SUserProfileInput>
                      <input
                          id="phonenumber"
                          type="phonenumber"
                          placeholder="登録なし"
                      />
                    </SUserProfileInput>
                  </>
                  : <p>電話番号: 登録なし</p>
                }
            </SUserProfileRow>
        </SUserProfileFrame>

        <SUserProfileRow>
            <SMainButton type="button" onClick={onBackToMainClick}>
                Back to Main
            </SMainButton>
        </SUserProfileRow>
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

const SUserProfileRow = styled.div`
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

const SUserProfileLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SUserProfileInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;
