import { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import React from "react";
import { hostUrl } from "../api/hostUrl";
import { UserContext } from "./UserProvider";

// 保持する情報の型
type UserIcon = {
  id: number,
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
  const [userIcons, setUserIcons] = useState<UserIcon[]>([]);

  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    fetch(hostUrl + `/user/token=${userInfo.token}`)  // NestJS APIのURL
      .then((res) => res.json())
      .then((data: UserIcon[]) => {
        console.log("UserIcon[]:", data)
        setUserIcons(data);
      })
      .catch((err) => {
        console.error('アイコン取得エラー:', err);
      });
  }, []);

  return (
    <>
      <UserIconContext.Provider value={{ userIcons, setUserIcons }}>
        {children}
      </UserIconContext.Provider>
    </>
  );
};