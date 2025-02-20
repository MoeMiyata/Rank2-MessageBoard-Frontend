import React from "react";
// import { useEffect, useContext } from 'react';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout.tsx";
import { PostListProvider } from "../providers/PostListProvider.tsx";  // 追加（ポスト保持コンテキスト作成）
import { UserContext } from "../providers/UserProvider.tsx";
import { LoginUserProvider } from "../providers/LoginUserProvider.tsx";

export default function Main() {
	const { userInfo } = useContext(UserContext);
	const loggedIn = (userInfo.token !== '');
	console.log(loggedIn);

	return (
		<PostListProvider>
		{/* ユーザのログイン情報を扱うためのProvider ↓ */}
		<LoginUserProvider>
		  {
		    loggedIn ? <MainLayout />:<Navigate replace to="/" />
          }
		</LoginUserProvider>
		</PostListProvider>
	)
}