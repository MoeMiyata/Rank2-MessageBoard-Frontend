import React, { useContext } from "react"
import styled from "styled-components"

import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { UserContext } from "../providers/UserProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { getList } from "../api/Post.tsx";


export const DeletePost = (props: any) => {
    const { id } = props;

    const { userInfo } = useContext(UserContext);
    const { setPostList } = useContext(PostListContext);
    const { pageNumber } = useContext(PageLinkContext);

    // ポスト一覧を取得して、対象のポストのみ削除する関数
    const getPostListExcludeOne = async() => {
        const posts = await getList(userInfo.token, pageNumber);
        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
            posts.forEach((p: any) => {
                if (!p.id === id) { // 取得したポストが削除したいポストidと一致しなければ追加
                    postList.push({
                        id: p.id,
                        user_name: p.user_name,
                        content: p.content,
                        created_at: new Date(p.created_at),
                        });
                }
            });
        }
        console.log("posts(getPostListExcludeOne):", posts);
        setPostList(postList);
    }

    const onDeletePostClick = () => {
        getPostListExcludeOne()
        console.log("post.id:", id, "のメッセージ削除");
    }

    return <SDeletePostButton onClick={onDeletePostClick}>削除</SDeletePostButton>
}

const SDeletePostButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
`