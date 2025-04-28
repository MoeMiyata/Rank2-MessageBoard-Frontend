import { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import React from "react";
import { UserContext } from "./UserProvider.tsx";
import { getUserIcons } from "../api/User.tsx";

// 保持する情報の型
type UserIcon = {
  name: string,
  imgSrc: string,
};

export const UserIconContext = createContext(
  {} as {
    userIcons: UserIcon[]; // idとimgSrcを格納したUserIcon型の配列
    setUserIcons: Dispatch<SetStateAction<UserIcon[]>>; // 状態更新関数
  },
);

// LoginUserProviderの定義
export const UserIconProvider = (props: any) => {
  const { children } = props;
  // userIcons を辞書（オブジェクト）形式で管理
  const [ userIcons, setUserIcons ] = useState<UserIcon[]>([]);

  const { userInfo } = useContext(UserContext)

  // ユーザアイコン情報一覧を取得する関数
  const getIconList = async() => {
    const icons = await getUserIcons(userInfo.token);

    console.log('icons:', icons)
    setUserIcons(icons)
  }

  useEffect(() => {
    getIconList()
  }, []);

  return (
    <>
      <UserIconContext.Provider value={{ userIcons, setUserIcons }}>
        {children}
      </UserIconContext.Provider>
    </>
  );
};