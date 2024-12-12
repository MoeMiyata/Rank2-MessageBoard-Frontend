import React from 'react';
import { useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import Header from "./Header.tsx";
import SideBar from "./SideBar.tsx";
import Contents from "./Contents.tsx";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { getList } from "../api/Post.tsx";

export default function MainLayout() {
  const { userInfo } = useContext(UserContext);
  const { setPostList } = useContext(PostListContext);

  const getPostList = async () => {
    console.log("MainLayout: getPostList");
    const posts = await getList(userInfo.token);
    console.log(posts);
    let postList: Array<PostType> = [];

    if (posts) {
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

  return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>

      <SBody>
        <SSideBar>
          <SideBar></SideBar>
        </SSideBar>

        <SContents>
          <Contents></Contents>
        </SContents>
      </SBody>
    </>
  );
}


const SHeader = styled.div`
  width: 100%;
  height: 32px;
  box-shadow: 0px 4px 4px #AAAAAA;
`;

const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: row;
`;

const SSideBar = styled.div`
  border-right: 1px solid #222222;
  width: 30%;
  height: 100%;
`;

const SContents = styled.div`
  width: 100%;
  height: 100%;
`;