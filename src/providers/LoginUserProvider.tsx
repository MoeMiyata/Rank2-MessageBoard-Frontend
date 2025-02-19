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
  const [loginUser, setLoginUser] = useState<LoginUser>({ id: 0, name: "", hash: "", email: "", created_at: "", updated_at: "" });
  return (
    <>
      <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </LoginUserContext.Provider>
    </>
  );
};