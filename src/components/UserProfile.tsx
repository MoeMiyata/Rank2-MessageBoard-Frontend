import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginUserContext } from "../providers/LoginUserProvider.tsx";
import { getUser, updateUser } from "../api/User.tsx";
import { UserContext } from "../providers/UserProvider.tsx";

export default function UserProfile() {
  console.log('In UserProfile!\n');

  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(LoginUserContext);
  console.log('loginUser:', loginUser);
  console.log('loginUser(birthday):', loginUser.birthday);

  const { userInfo} = useContext(UserContext);

  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string|undefined>(undefined);
  const [birthday, setBirthday] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const currentYear = new Date().getFullYear();
  // 100年前の日付を計算
  const hundredYearsAgo = currentYear - 100;
  const currentDate = new Date().toISOString().split("T")[0]; // 現在の日付（YYYY-MM-DD形式）
  const hundredYearsAgoDate = new Date(hundredYearsAgo, 0, 1).toISOString().split("T")[0]; // 100年前の1月1日

  // プロフ画像
  const [profileImage, setProfileImage] = useState('');
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  };
  
  // 登録ボタンが押せるかの判定
  const isRegisterValid = name !== '' || email !== '' || pass !== undefined || birthday !== '' || address !== '' || tel !== '' || profileImage !== '';

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
    let updateImgsrc = '';

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
    if (updateImgsrc !== loginUser.imgSrc) {
      console.log(profileImage);
      updateImgsrc = profileImage;
    }

    console.log('name, email, pass, birthday, address, tel, imgSrc:', name, email, pass, birthday, address, tel, profileImage)
    console.log('updateName, updateEmail, pass, updateBirthday, updateAddress, updateTel, updateImgsrc:', updateName, updateEmail, pass, updateBirthday, updateAdress, updateTel, updateImgsrc)

    if (updateName.trim() === '' && updateEmail.trim() === '' && updateBirthday.trim() === '' && (pass === undefined || pass.trim() === '') && updateAdress.trim() === '' && updateTel.trim() === '' && updateImgsrc.trim() === '') {
      alert('変更内容がありません．')
      return ;
    } 

    const error = await updateUser(userInfo.id, userInfo.token, updateName, updateEmail, pass, updateBirthday, updateAdress, updateTel, updateImgsrc);
    // const error = null;

    if (error) {
      alert(error.response.data.message); // サーバ側で設定したエラー文を表示
      // alert('error!');
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
              {/* <SUserProfileImage src="https://fujifilmsquare.jp/assets/img/column/column_24_mv.jpg" alt="ProfileImage" /> */}
              <SUserProfileImage src={loginUser.imgSrc}  alt="ProfileImage" />
              {isEditMode ? 
                <div>
                  <input type="file" accept="image/*" onChange={onFileInputChange} />
                </div>
                : null}
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>Name: {loginUser.name}</h1> */}
                {isEditMode ? 
                  <>
                    <SUserProfileLabel>
                      <label htmlFor="name">Name</label>
                    </SUserProfileLabel>

                    <SUserProfileData>
                      <SUserProfileInput>
                        <input
                          id="name"
                          // value={pass}
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
                      Name 👤 : 
                    </SUserProfileLabel>
                    <SUserProfileData>
                      {loginUser.name}
                    </SUserProfileData>
                    {/* <span>{loginUser.name}</span> */}
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
                  // <p>メールアドレス: {loginUser.email}</p>
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
                {/* <h1>ハッシュ: {loginUser.hash}</h1> */}
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
                            // placeholder={loginUser.birthday ? loginUser.birthday.toISOString().split('T')[0] : ''}
                            min={hundredYearsAgoDate} // 100年前の日付
                            max={currentDate} // 現在の日付
                            // onChange={(evt) => {setLoginUser((prevState) => ({
                            //   ...prevState,  // 前の状態を維持
                            //   birthday: new Date(evt.target.value),   
                            //   }));
                            //   console.log("Selected birthday:", evt.target.value);} 
                            // }
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
                      {/* {loginUser.birthday 
                        ? loginUser.birthday.getFullYear() + '年' + (loginUser.birthday.getMonth() + 1) + '月' + loginUser.birthday.getDate() + '日'
                        : '登録なし'} */}
                      {loginUser.birthday 
                        ? new Date(loginUser.birthday).getFullYear() + '年 ' + 
                          (new Date(loginUser.birthday).getMonth() + 1) + '月 ' + 
                          new Date(loginUser.birthday).getDate() + '日'
                        : '登録なし'}
                      {/* 誕生日（Date型では表示されないので修正必要） */}
                    </SUserProfileData>
                  </>
                }
            </SUserProfileRow>

            <SUserProfileRow>
                {/* <h1>住所: 登録なし</h1> */}
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
                            // onChange={(evt) => setLoginUser((prevState) => ({
                            //   ...prevState,  // 前の状態を維持
                            //   address: evt.target.value,   // telだけを更新
                            // }))}
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

// const SUserProfileFrame = styled.div`
//   background-color: #f8f8f8;
//   // margin: 80px;
//   // margin: 40px 80px 80px 80px;
//   margin: ${({ isEditMode }) => (isEditMode ? "40px 80px 80px 80px" : "100px 80px 80px 80px")};
  
//   padding-top: 8px;
//   padding-bottom: 8px;
//   border-radius: 8px;
//   box-shadow: 0 8px 8px #aaaaaa;
// `;
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