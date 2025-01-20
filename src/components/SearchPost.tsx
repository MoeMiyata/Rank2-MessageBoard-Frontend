import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { PageLinkContext } from "../providers/PageLinkProvider";
import { getList } from "../api/Post";

export const SearchPost = () => {
    const [kwd, setKwd] = useState("");

    const { userInfo } = useContext(UserContext);
    const { setPostList } = useContext(PostListContext);
    const { pageNumber } = useContext(PageLinkContext);
    // ポスト一覧を取得する関数
    const getSearchPostList = async() => {
        const posts = await getList(userInfo.token, pageNumber);
        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
        posts.forEach((p: any) => {
            if ((p.content).includes(kwd))
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

    const onSearchPostClick = () => {
        console.log("kwd:", kwd)
        getSearchPostList()
    }

    return (
        // <SSearchForm>
            <SSearchDiv>
                <SSearchPost type="search" placeholder="検索" name="kwd" onChange={(evt) => setKwd(evt.target.value)}/>
                <SSearchIcon type="submit" onClick={onSearchPostClick}><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/searchicon.png?raw=true" alt="search" width="30" height="30" /></SSearchIcon>
            </SSearchDiv> 
        // </SSearchForm>
        
    )
}


const SSearchDiv = styled.div`
  display: flex;
  position: relative;
  left: 25%;
`

const SSearchForm = styled.form`
  display: flex;
  position: relative;
  left: 25%;
`

const SSearchPost = styled.input`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  margin: 2.5px;
  text-align: center;
  width: 400px;
`

const SSearchIcon = styled.button`
  background-color: #222222;
  border: none;
`


// 投稿一覧を表示し、検索されるとその表示された10個の投稿からListを削って表示する