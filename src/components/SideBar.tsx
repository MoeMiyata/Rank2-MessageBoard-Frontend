import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';
import { post, getList } from "../api/Post.tsx";
import { getUser } from '../api/User.tsx';

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const [ userName, setUserName ] = useState(""); // ユーザ登録（ログインユーザの名前取得）
  const [ userEmail, setUserEmail ] = useState(""); // ユーザ登録（ログインユーザのmail address取得）

  const { userInfo } = useContext(UserContext);  // コンテキストからuserInfoを取り出す

  const { pageNumber } = useContext(PageLinkContext);

  const { setPostList } = useContext(PostListContext); 

  useEffect(() => {
    const myGetUser = async () => {
      const user = await getUser(userInfo.id, userInfo.token);
      setUserName(user.name);
      setUserEmail(user.email);
    };
    myGetUser();
  }, []);

  const getPostList = async () => {
    const posts = await getList(userInfo.token, pageNumber);
    console.log(posts);

    let postList: Array<PostType> = [];
    if (posts) {
      console.log(posts);
      posts.forEach((p: any) => {
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }
    setPostList(postList);
  };

  const onSendClick = async () => {
	  await post(String(userInfo.id), userInfo.token, msg);
    await getPostList();
  };

  return (
    <SSideBar>
      {/* <SSideBarRow>hoge</SSideBarRow> */}
      <SSideBarRow>{userName}</SSideBarRow>

      {/* <SSideBarRow>hoge@example.com</SSideBarRow> */}
      <SSideBarRow>{userEmail}</SSideBarRow>

      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
        ></SSideBarTextArea>
      </SSideBarRow>

      <SSideBarRow>
        <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
}


const SSideBar = styled.div`
  padding: 8px;
`

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`