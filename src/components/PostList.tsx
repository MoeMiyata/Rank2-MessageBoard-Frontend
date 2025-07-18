import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { UserContext } from "../providers/UserProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";

import { getList } from "../api/Post.tsx";


import PageLink from './PageLink.tsx';
import { UserIconProvider } from "../providers/UserIconProvider.tsx";

export default function PostList() {
  const { postList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);
  const { setPostList } = useContext(PostListContext);

  const { pageNumber } = useContext(PageLinkContext);
  const { kwd } = useContext(SearchPostContext);

  // ポスト一覧を取得する関数
  const getPostList = async() => {
    const posts = await getList(userInfo.token, pageNumber, kwd);

    // getListで取得したポスト配列をコンテキストに保存する
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
  }

  // 描画時にポスト一覧を取得する
  useEffect(() => {
    getPostList();
    console.log('ページ更新');
  }, [pageNumber]);

  console.log('postList:', postList);

  return (
    <>
    <UserIconProvider>
      {postList.length === 0 ? (
        <p style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          表示できる投稿がありません
        </p>
      ) :
        <SPostList>
          {postList.map((p) => (
            <Post key={p.id} postOwnerName={p.user_name} post={p} />
          ))}
          <PageLink postList={postList} kwd={kwd}></PageLink>
        </SPostList>
      }
    </UserIconProvider>
    
    </>
  );
}

const SPostList = styled.div`
  // margin-top: 16px;
  margin: 16px;
  height: 100%;
  overflow-y: scroll;
`