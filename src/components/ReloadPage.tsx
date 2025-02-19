import React, { useContext } from "react";
import styled from "styled-components";

import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { UserContext } from "../providers/UserProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";
import { getList } from "../api/Post.tsx";

export const ReloadPage = () => {
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

    const onReloadClick = () => {
        getPostList();
       console.log('ページ更新');
    }

    return (
        <SPageLinkNextButton onClick={onReloadClick}><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/reloadicon_white.png?raw=true" alt="button" width="30" height="30" /></SPageLinkNextButton>
    )
}

const SPageLinkNextButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  position: fixed;
  top: 45px;
  right: 10px;
  padding: 3px 5px 0px 4px;
  border-radius: 50%;
`