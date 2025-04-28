import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropbox } from 'dropbox'; // Dropbox SDKをインポート

import { LoginUserContext } from "../providers/LoginUserProvider.tsx";
import { getUser, updateUser } from "../api/User.tsx";
import { UserContext } from "../providers/UserProvider.tsx";


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

  // 初回レンダリング時にloginUserの情報入力
  useEffect(() => {
    if (loginUser) {
      setName(loginUser.name);
      setEmail(loginUser.email);
      setBirthday(loginUser.birthday!);
      setAddress(loginUser.address);
      setTel(loginUser.tel);
      setProfileImageUrl(loginUser.imgSrc); // これが初期表示の画像URL
    }
  }, [loginUser]);

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
  
  // const accessToken: string = 'sl.u.AFr6UfeWAIAcDRKXDNvSFpGDpnvoVC2x_3-MivMz5IcQ11aUuScwFkrGWz7aHUkBiEz23Yj129rtfPVzkz3fMbmMcRS2BG2tvEJ7ymW3aKJmi3lJqE2vzVjnt2GFokxuimlqgtMrQVw9mGOLZri_kcmsfsWZuXg32HL3QvtV-rxDoxOHX4gfManKH8U3t7VRPbuhdtaxSOPXxLjOu_b0hdDEKsFNjuK-3Du_9Ik9xge5jKbyP_OZGE0oavLvCyh9RloU-5XAltzh4C5X3fYmGV5cBa5lBfo9pHpXpaRkCSEVBv2P9FBOi7fC-UUpFNZXWCkQ7NiWBd3eD4q7pP1456cf5wLHmDxc9iRR35LEFhZq_fz5sQc2ohwi8qxIoa4URUDDI3Y8pwP1qZG3WK8urXB8b8KjnT_7imHV_8ZNhMbp8HyD1_BLWsRVqPbrOfrCKDLGSUnKw5VWmxLR1aDaL6gPQEuRKBLAWjVyUinjPofcSeqiCGK8lvwAHX6hMZx_3DiwmuamDA0mbWgutmhDMcZV9UMgnZYUpktwOEZMQ4uaXCt9gG16pnD_2zitubx-8Efg4ML54YVEu-OOzw9ahIe7nDhTJvBFQJkuytvXLCqJD3UCJMAFQ-BEgGsh-leH3Jl8FF7EYwi32vutLzAQGd6yKxyggSkQvCdp0mrPy6fQgjI4ns0lsXyowKhysNsJRhERMZjjHpdymKhMVdXVn_5eYatqnlxuSsohTjfAUHwDyd3IETOG3Rxo1zkHpccRMVzxLpHUQj3E0iOCTG3wGcsyR5fuizbIepPctK67XuPrbqaI1i_nPy9JU1T078saqL5C23HkQxUrL7EvCcg4aZsGgY9AgK4F6mXsAp7WZZTrXJwcHDZ-UrQ2Pkb0zwXcKzDnHJw0u0_omqx7LDegcFzZB_6rpUwXtH6QbarUy-MFkAmpSsoCTcFWV5EANf7ILlIS8viwi-3HZ9D7GnRMY1h2-on-HIlSsjHsOS-yL26V4mriUNJTuEbT3lO8xklmWiWCPDhH4ejVS9jpVG8AarnbGwL18_Ljqxvr5g2GFlPpleqLDp0inu2T5BSDcJdwXhvChz4oejHg_GFXBgC1UFC238XoUK2omLlnGNbXKEPIzJQPwQCt4Lz9BctdjPZLzVRCrxbn0i3pKYvXV4GaXkDigGMfSMp3d_qpz4KdcVXYNrqfzK0GC7vG956l4dD5TVMMv_xkZ3bCiUWXUmoV6hA0iJi7wXI51gCJI0ZjmD9MS_wYV-9_V-hiO1EjyalTlvDYy5o3Ll3LNNUa3w2Kul4LGYbawX0CEMUEF-x5kf2Cyym9PN0JMI6vA-f6gJLF8khDBIVIFHQqrhUWh0vkq3UuOoTi8ridJTEdpzM9m9ssVojraODR6kkOsyU_ge69_BrXWxQH4Ptpz0thfGR8fHKYDgkyxmI5EBJsgdjoY7ysuA';
  // const accessToken = await refreshAccessToken(
  //   "lpGMfLpOc8IAAAAAAAAAAe9qa0hrZoXbH-plrBcsWc3sfqk8SYAl9ZHOz4hXHOL0",
  //   "j3li7gaq8uneq5y",
  //   "ev12iix1eberer6"
  // );

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

    const accessToken = await refreshAccessToken("lpGMfLpOc8IAAAAAAAAAAe9qa0hrZoXbH-plrBcsWc3sfqk8SYAl9ZHOz4hXHOL0", "j3li7gaq8uneq5y", "ev12iix1eberer6");
      if (accessToken) {
        console.log("取得成功:", accessToken);
      }

    const dbx = new Dropbox({ accessToken });
    console.log("dbx", dbx);

    let sharedLinkUrl = ''

    try {
      const response = await dbx.filesUpload({
        path: '/' + loginUser.name + '_profileImage.jpg',
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
            <SLogo isEditMode={isEditMode}>User Profile</SLogo>
            <SRightItem>
              <SEdit onClick={onEditModeClick}>{isEditMode ? "キャンセル" : "編集"}</SEdit>
            </SRightItem>
        </SHeader>

        <SUserProfileTextRow>
          {isEditMode ? "登録内容を編集してください。" : null}
        </SUserProfileTextRow>

        <SUserProfileFrame  isEditMode={isEditMode}>
            <SUserProfileRow>
              <SUserProfileImage src={isEditMode && profileImageUrl ? profileImageUrl : loginUser.imgSrc} />
              {isEditMode ? 
                <div>
                  <input type="file" accept="image/*" onChange={onFileInputChange} />
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
                          value={name}
                          onChange={(evt) => setName(evt.target.value)}
                      />
                      </SUserProfileInput>
                    </SUserProfileData>

                  </>
                  :
                  <>
                    <SUserProfileLabel>
                      Name 👤 : 
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
                          value={email}
                          onChange={(evt) => setEmail(evt.target.value)}
                      />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      Email ✉️ : 
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
                      Password 🔑 : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      ＊＊＊＊＊
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>生年月日:  登録なし</h1> */}
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
                      Date of birth 🎂 : 
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
                      Address 🏠 : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                    {loginUser.address || '登録なし'}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>電話番号: 登録なし</h1> */}
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
                            // onChange={(evt) => setLoginUser((prevState) => ({
                            //   ...prevState,  // 前の状態を維持
                            //   tel: evt.target.value,   // telだけを更新
                            // }))}
                            onChange={(evt) => setTel(evt.target.value)}
                        />
                      </SUserProfileInput>
                    </SUserProfileData>
                  </>
                  : 
                  <>
                    <SUserProfileLabel>
                      Phone number 📱 : 
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

const SLogo = styled.div<UserProfileProps>`
  padding-top: 8px;
  padding-bottom: 8px;
  // padding-left: 22px;
  padding-left: ${({ isEditMode }) => (isEditMode ? "67px" : "20px")};
  text-align: center;
  flex-grow: 1;  /* 残りのスペースを埋める */
`;

const SEdit = styled.div`
  // padding-top: 8px;
  padding-top: 6px;
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
`;

const SUserProfileRow = styled.div`
  dixplay: inline-block;
  // margin-top: 4px;
  // margin-bottom: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SUserProfileTextRow = styled.div`
  dixplay: inline-block;
  margin-top: 40px;
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
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SUserProfileInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SUserProfileData = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: left;
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SUserProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;