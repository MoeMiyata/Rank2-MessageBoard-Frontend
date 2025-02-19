import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { UserContext } from "../providers/UserProvider.tsx";
import { deletePost, getList } from "../api/Post.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from "../providers/PageLinkProvider.tsx";
import { SearchPostContext } from "../providers/SearchPostProvider.tsx";
import { getUser } from "../api/User.tsx";


export const DeletePost = (props: any) => {
    const { deleteid, postUserName } = props;

    const { userInfo } = useContext(UserContext);
    const { setPostList } = useContext(PostListContext);
    const { pageNumber } = useContext(PageLinkContext);
    const { kwd } = useContext(SearchPostContext);
    
    const [ userName, setUserName ] = useState("");

    // ログインユーザの名前を取得
    useEffect(() => {
        const myGetUser = async () => {
          const user = await getUser(userInfo.id, userInfo.token);
          setUserName(user.name);
        };
        myGetUser();
    }, []);

    console.log('userName:', userName)



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

    // 対象のポストのみ削除してリロードする関数
    const deletePostReload = async() => {
        await deletePost(userInfo.token, deleteid);
        getPostList()
    }

    const onDeletePostClick = () => {
        deletePostReload()
        console.log("post.id:", deleteid, "のメッセージ削除");
    }

    if (userName !== postUserName) {
        return null; // 一致しない場合は何も表示しない
    }

    return <SDeletePostButton onClick={onDeletePostClick}>削除</SDeletePostButton> //後ほど、ログインユーザのメッセージじゃなかったらボタンを表示しない
}

const SDeletePostButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  border-radius: 8px;
  padding: 0px 10px;
  margin-left: 30px;
`