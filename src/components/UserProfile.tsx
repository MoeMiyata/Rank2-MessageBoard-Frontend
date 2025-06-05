import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropbox } from 'dropbox'; // Dropbox SDKをインポート

import { LoginUserContext } from "../providers/LoginUserProvider.tsx";
import { getUser, updateUser } from "../api/User.tsx";
import { UserContext } from "../providers/UserProvider.tsx";
import { DeleteUser } from "./DeleteUser.tsx";


export default function UserProfile() {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(LoginUserContext);
  console.log('loginUser:', loginUser);

  const { userInfo } = useContext(UserContext);

  const [ isEditMode, setIsEditMode ] = useState(false);

  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ pass, setPass ] = useState<string|undefined>(undefined);
  const [ birthday, setBirthday ] = useState<string>('');
  const [ address, setAddress ] = useState<string>('');
  const [ tel, setTel ] = useState<string>('');
  const currentYear = new Date().getFullYear();
  // 100年前の日付を計算
  const hundredYearsAgo = currentYear - 100;
  const currentDate = new Date().toISOString().split("T")[0]; // 現在の日付（YYYY-MM-DD形式）
  const hundredYearsAgoDate = new Date(hundredYearsAgo, 0, 1).toISOString().split("T")[0]; // 100年前の1月1日

  /////// プロフ画像
  const [ profileImageUrl, setProfileImageUrl ] = useState(''); ///後でloginUser.ImgSrcに変更
  const [ profileImage, setProfileImage ] = useState<File | null>(null);


  const refreshAccessToken = async (
    refreshToken: string,
    clientId: string,
    clientSecret: string
  ): Promise<string | undefined> => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
  
    try {
      const response = await fetch("https://api.dropbox.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
  
      if (!response.ok) {
        console.error("トークンのリフレッシュに失敗しました:", response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("リフレッシュ結果:", data);
      return data.access_token; // 新しい access_token を返す
    } catch (error) {
      console.error("トークン更新中にエラー:", error);
      return;
    }
  };


  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(fileObject);
  };

  const handleUpload = async (): Promise<string | void> => {
    console.log('In handleUpload');

    if (!profileImage) return;

    const refreshToken = process.env.REACT_APP_DROPBOX_REFRESH_TOKEN;
    const clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID!;
    const clientSecret = process.env.REACT_APP_DROPBOX_CLIENT_SECRET!;

    // どれか1つでも欠けていたら中断
    if (!refreshToken || !clientId || !clientSecret) {
      console.error("❌ Dropbox APIの認証情報が見つかりません (.env.local が正しく設定されているか確認してください)");
      alert("Dropbox設定が不完全です。アップロードできません。");
      return;
    }

    const accessToken = await refreshAccessToken(refreshToken, clientId, clientSecret);
      if (accessToken) {
        console.log("取得成功:", accessToken);
      }

    const dbx = new Dropbox({ accessToken });
    console.log("dbx", dbx);

    let sharedLinkUrl = ''

    try {
      const response = await dbx.filesUpload({
        path: '/userID' + userInfo.id + '_profileImage.jpg',
        contents: profileImage,
        mode: { '.tag': 'overwrite' }, // 'overwrite' モードを指定
      });

      console.log('response:', response);

      // path_display が undefined でないことを確認
      const pathDisplay = response.result.path_display;
      if (!pathDisplay) {
        console.error('Error: path_display is undefined');
        return;
      }

      ///// 共有リンクを再利用するように修正
      const existingLinks = await dbx.sharingListSharedLinks({
        path: pathDisplay,
        direct_only: true,
      });

      if (existingLinks.result.links.length > 0) {
        sharedLinkUrl = existingLinks.result.links[0].url;
      } else {
        // 共有リンクを新規作成
        const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
          path: pathDisplay,
        });
        sharedLinkUrl = sharedLinkResponse.result.url;
      }

      const adjustedSharedLinkUrl = sharedLinkUrl.replace(/\?.*$/, '?dl=1') + `&t=${new Date().getTime()}`;  // URLの末尾にタイムスタンプを追加してキャッシュを避ける
      setProfileImageUrl(adjustedSharedLinkUrl); // .replace('?dl=0', '?raw=1')は表示する際にdl=0->dl=1に変更必要
      return adjustedSharedLinkUrl;

    } catch (error) {
      if (error?.error?.error_summary) {
        console.error('Dropbox error summary:', error.error.error_summary);
      }

      console.error('Error uploading file:', error);

      return
    }
  };
  /////// ここまでプロフ画像
  
  // 登録ボタンが押せるかの判定
  const isRegisterValid = name !== '' || email !== '' || pass !== undefined || birthday !== '' || address !== '' || tel !== '' || profileImage !== null;

  const onBackToMainClick = async () => {
    navigate("/main");
  }
  console.log('loginUser:', loginUser)

  const onEditModeClick = async () => {
    setIsEditMode(!isEditMode);
  }

  const onUserProfileRegisterClick = async () => {
    let updateName = '';
    let updateEmail = '';
    let updateBirthday = '';
    let updateAdress = '';
    let updateTel = '';
    let updateImgUrl = '';

    if (name !== loginUser.name) {
      updateName = name !== '' ? name : ''; // 空文字を反映
    }
    if (email !== loginUser.email) {
      updateEmail = email;
    }
    if (birthday !== loginUser.birthday) {
      updateBirthday = birthday;
    }
    if (address !== loginUser.address) {
      updateAdress = address;
    }
    if (tel !== loginUser.tel) {
      updateTel = tel;
    }
    if (profileImage) { // 画像がuploadされていれば更新
      const uploadedUrl = await handleUpload(); // DropBoxに画像データ送信
      if (uploadedUrl) {
        updateImgUrl = uploadedUrl;
        console.log("uploadedUrl:", uploadedUrl)
      }
    }

    console.log('name, email, pass, birthday, address, tel, imgSrc:', name, email, pass, birthday, address, tel, profileImageUrl)
    console.log('updateName, updateEmail, pass, updateBirthday, updateAddress, updateTel, updateImgsrc:', updateName, updateEmail, pass, updateBirthday, updateAdress, updateTel, updateImgUrl)

    console.log('profileImageUrl:', profileImageUrl);

    if (updateName.trim() === '' && updateEmail.trim() === '' && updateBirthday.trim() === '' && (pass === undefined || pass.trim() === '') && updateAdress.trim() === '' && updateTel.trim() === '' && updateImgUrl.trim() === '') {
      console.log("updateImgUrl:", updateImgUrl)
      alert('変更内容がありません．')
      return ;
    } 

    const error = await updateUser(userInfo.id, userInfo.token, updateName, updateEmail, pass, updateBirthday, updateAdress, updateTel, updateImgUrl);

    if (error) {
      alert(error.response.data.message); // サーバ側で設定したエラー文を表示
    } else {
      ////// ここで、登録できたら登録内容をloginUserに反映する
      const myGetUser = async () => {
        const user = await getUser(userInfo.id, userInfo.token);
        setLoginUser(user);
      };
      myGetUser();

      //　ユーザ情報一覧ページ（編集ボタン押印前）に移行
      setIsEditMode(!isEditMode);
    }
  };


  return (
    <>
        <SHeader>
            <STitle isEditMode={isEditMode}>User Profile</STitle>
            <SRightItem>
              <SEdit onClick={onEditModeClick}>{isEditMode ? "キャンセル" : "編集"}</SEdit>
            </SRightItem>
        </SHeader>

        <SUserProfileTextRow isEditMode={isEditMode} >
          {isEditMode ? "登録内容を編集してください。" : null}
        </SUserProfileTextRow>

        <SUserProfileFrame  isEditMode={isEditMode}>
            <SUserProfileRow>
              <SUserProfileImage src={isEditMode && profileImageUrl ? profileImageUrl : loginUser.imgSrc} />
              {isEditMode ? 
                <div>
                  <SUserProfileImageInput type="file" accept="image/*" onChange={onFileInputChange} />
                </div>
                : null}
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="name">Name</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                          id="name"
                          type="name"
                          placeholder={loginUser.name}
                          onChange={(evt) => setName(evt.target.value)}
                      />
                      </SUserProfileInput>
                    </SUserProfileData>

                  </>
                  :
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-user"></i>
                      Name : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      {loginUser.name}
                    </SUserProfileData>
                  </>
                  }
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="email">Email</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                          id="email"
                          type="email"
                          placeholder={loginUser.email}
                          onChange={(evt) => setEmail(evt.target.value)}
                      />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-envelope"></i>
                      Email : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      {loginUser.email}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                     <label htmlFor="password">Password</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                      <input
                          id="password"
                          type="password"
                          placeholder="＊＊＊＊＊"
                          onChange={(evt) => setPass(evt.target.value)}
                      />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-key"></i>
                      Password : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      ＊＊＊＊＊
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="birthday">Date of birth</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                            id="birthday"
                            type="date"
                            min={hundredYearsAgoDate} // 100年前の日付
                            max={currentDate} // 現在の日付
                            onChange={(evt) => {setBirthday(evt.target.value);
                              console.log("Selected birthday:", evt.target.value);}
                            }
                        />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  :
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-birthday-cake"></i>
                      Date of birth : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      {loginUser.birthday 
                        ? new Date(loginUser.birthday).getFullYear() + '年 ' + 
                          (new Date(loginUser.birthday).getMonth() + 1) + '月 ' + 
                          new Date(loginUser.birthday).getDate() + '日'
                        : '登録なし'}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="address">Address</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                            id="address"
                            type="text"
                            placeholder={loginUser.address}
                            onChange={(evt) => setAddress(evt.target.value)}
                        />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-home"></i>
                      Address : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                    {loginUser.address || '登録なし'}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="phonenumber">Phone number</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                            id="phonenumber"
                            type="tel"
                            placeholder={loginUser.tel}
                            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                            required 
                            onChange={(evt) => setTel(evt.target.value)}
                        />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      <i className="fas fa-phone"></i>
                      Phone number : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      {loginUser.tel || '登録なし'}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>
        </SUserProfileFrame>

        <SUserProfileRow>
          {isEditMode ? 
            <SRegisterButton type="button" onClick={onUserProfileRegisterClick} disabled={!isRegisterValid}>
              登録する
            </SRegisterButton>
            :
            <SMainButton type="button" onClick={onBackToMainClick}>
              Back to Main
            </SMainButton>
          }
          <div>
            <DeleteUser/>
          </div>
          <div>
            <SLogo>
              - MicroPost -
            </SLogo>
          </div>
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
  // height: 100%;
  height: 32px;
  justify-content: space-between;
  box-shadow: 0px 4px 4px #AAAAAA;
`;

const SRightItem = styled.div`
  display: flex;
  flex-direction: row;
`

interface UserProfileProps {
  isEditMode: boolean;
}

const STitle = styled.div<UserProfileProps>`
  padding-top: 5px;
  padding-bottom: 8px;
  // padding-left: 22px;
  padding-left: ${({ isEditMode }) => (isEditMode ? "67px" : "20px")};
  text-align: center;
  flex-grow: 1;  /* 残りのスペースを埋める */
  font-size: large;
`;

const SEdit = styled.div`
  // padding-top: 8px;
  padding-top: 4px;
  padding-bottom: 8px;
  padding-right: 4px;
  text-align: center;
  justify-content: end;
  cursor: pointer;  // ポインタ追加
`

const SUserProfileFrame = styled.div<UserProfileProps>`
  background-color: #f8f8f8;
  margin: ${({ isEditMode }) => (isEditMode ? "40px 80px 80px 80px" : "105px 80px 80px 80px")};
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;

  @media (max-width: 768px) {
    margin: 20px 20px 20px;
    font-size: small;
  }
`;

const SUserProfileImageInput = styled.input`
  @media(max-width: 768px) {
    font-size: smaller;
  }
`; 

const SUserProfileRow = styled.div`
  // display: inline-block;
  // margin-top: 4px;
  // margin-bottom: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SUserProfileTextRow = styled.div<{ isEditMode: boolean }>`
  // display: inline-block;
  margin-top: 40px;

  @media(max-width: 768px) {
    // display: none;
    font-size: smaller;
    margin-top: ${({ isEditMode }) => ( isEditMode ? '20px' : '60px' )};
  }
`;

const SMainButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer; 
`;

const SRegisterButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer; 

  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed; 
  }
`;

const SUserProfileLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
  margin-left: 4px;
  margin-top: 4px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    width: 45%;
    // width: 100%;
    // text-align: center;
  }
`;

const SUserProfileInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;

  @media (max-width: 768px) {
    width: 48%;
    // width: 100%;
    // text-align: center;
  }
`;

const SUserProfileData = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: left;
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    width: 45%;
  }
`;

const SUserProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const SLogo = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: large;

  @media (max-width: 768px) {
    bottom: 30px;
    font-size: small;
  }
`;