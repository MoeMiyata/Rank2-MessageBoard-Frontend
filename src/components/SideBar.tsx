import React from 'react';
import { useState, useContext } from "react";
import styled from "styled-components";

import useSound from 'use-sound';

import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';
import { post, getList } from "../api/Post.tsx";
import { LoginUserContext } from '../providers/LoginUserProvider.tsx';
import { VolumeContext } from '../providers/VolumeProvider.tsx';
import { PostMobile } from './PostMobile.tsx';
import { extractKeywords, getKeywordLinks } from '../api/Keywords.ts';
import { KeywordsLinksContext } from '../providers/KeywordLinksProvider.tsx';

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);  // コンテキストからuserInfoを取り出す
  const { isMute } = useContext(VolumeContext);
  const { loginUser } = useContext(LoginUserContext);
  const { pageNumber } = useContext(PageLinkContext);
  const { setPostList } = useContext(PostListContext); 
  const { setKeywordLinks } = useContext(KeywordsLinksContext);

  const [ playSend ] = useSound('/mute_shupon.mp3', { playbackRate: isMute ? 0 : 1 });

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

  const onSendClick = async (message: string) => {
	  await post(String(userInfo.id), userInfo.token, msg.replace(/\n+$/, ''));
    await getPostList();
    playSend()

    await extractKeywords(message);
    const myGetkeywordLinks = async () => {
      const kwdLinks = await getKeywordLinks();
      setKeywordLinks(kwdLinks);
      console.log("keywordLinks(MainLayout):", kwdLinks);
    };
    myGetkeywordLinks();
  };

  return (
    <>
      <SSideBar>
        <SSideBarRow>
          <SUserProfileImage src={loginUser.imgSrc} alt='profileImage'/>
          <SSideBarRow>{loginUser.name}</SSideBarRow>
          <SSideBarRow>{loginUser.email}</SSideBarRow>
        </SSideBarRow>

        <SSideBarRow>
          <SSideBarTextArea
            rows={4}
            value={msg}
            onChange={(evt) => setMsg(evt.target.value)}
          ></SSideBarTextArea>
        </SSideBarRow>

        <SSideBarRow>
          <SSideBarButton onClick={() => onSendClick(msg)} disabled={msg.trim() === ''}>送信</SSideBarButton>
        </SSideBarRow>
      </SSideBar>

      <SMobileSideBar>
        <PostMobile/>
      </SMobileSideBar>
    </>
  );
}


const SSideBar = styled.div`
  margin: 20px 0px 0px 15px;
  padding: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  // text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  width: 100%;
`;

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  // width: 155px;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: #aaaaaa;  // 無効化されたボタンのスタイルを変更
    cursor: not-allowed;  // 無効化されたボタンのカーソルを変更
  }
`;

const SUserProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;



const SMobileSideBar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block; // とりあえずblock
  }
`;