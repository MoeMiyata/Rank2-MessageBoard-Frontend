import { useState, createContext, Dispatch, SetStateAction } from "react";
import React from "react";

// 保持する情報の型
type LoginUser = {
  id: number,
  name: string,
  hash: string,
  email: string,
  created_at: string,
  updated_at: string,
  birthday: string | undefined,
  address: string,
  tel: string,
  imgSrc: string, //プロフ画像のpath
};

export const LoginUserContext = createContext(
  {} as {
    loginUser: LoginUser;
    setLoginUser: Dispatch<SetStateAction<LoginUser>>;
  },
);

// LoginUserProviderの定義
export const LoginUserProvider = (props: any) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser>({ id: 0, name: "", hash: "", email: "", created_at: "", updated_at: "", birthday: undefined, address: "登録なし", tel: "登録なし", imgSrc: 'https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/profileicon_default.png?raw=true'});
  return (
    <>
      <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    </>
  );
};