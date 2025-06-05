import React, { useContext, useState } from "react";
import styled from "styled-components";

import useSound from 'use-sound';

import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';
import { post, getList } from "../api/Post.tsx";
import { VolumeContext } from '../providers/VolumeProvider.tsx';

export const PostMobile = () => {
    const [ isOpenPostBox, setIsOpenPostBox ] = useState(false);
    const [ msg, setMsg ] = useState("");
    const { userInfo } = useContext(UserContext);  // コンテキストからuserInfoを取り出す
    const { isMute } = useContext(VolumeContext);
    const { pageNumber } = useContext(PageLinkContext);
    const { setPostList } = useContext(PostListContext); 

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

    const onPostMobileButton = () => {
        setIsOpenPostBox(!isOpenPostBox)
        console.log('投稿（Mobile ver）');
        console.log(msg);
    }

    const onSendClick = async () => {
        await post(String(userInfo.id), userInfo.token, msg.replace(/\n+$/, ''));
        await getPostList();
        playSend()
    };

    return (
        <>
            { isOpenPostBox && (
            <SMobilePostBoxContainer>
                <SMobilePostBox>
                    <SMobilePostWrapper>
                        <SMobilePostTextArea
                            rows={2}
                            value={msg}
                            onChange={(evt) => setMsg(evt.target.value)}
                        ></SMobilePostTextArea>
                        <SMobileSendButton onClick={onSendClick} disabled={msg.trim() === ''}>
                            ➤
                        </SMobileSendButton>
                    </SMobilePostWrapper>
                </SMobilePostBox>
            </SMobilePostBoxContainer>
            )}
            <SPostMobileButton onClick={onPostMobileButton}>
              {/* <img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/posticon.png?raw=true" alt="button" width="30" height="30" /> */}
              <i className="fas fa-edit" style={{width: '30px', height: '30px', color: 'white'}}></i>
            </SPostMobileButton>
        </>
    )
}

const SPostMobileButton = styled.button`
  background-color: #222222;
  color: #FAFAFA;
  position: fixed;
  bottom: 90px;
  right: 10px;
  padding: 3px 5px 0px 4px;
  border-radius: 50%;
  cursor: pointer;
`;

const SMobilePostBoxContainer = styled.div`
  display: inline-block;
  justify-content: center;
`;

const SMobilePostBox = styled.div`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(34, 34, 34);
  width: 90%;
  padding-top: 12px;
  padding-bottom: 8px;
  border-radius: 20px;
  box-shadow: rgb(170, 170, 170) 0px 8px 8px;
`;

const SMobilePostWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SMobilePostTextArea = styled.textarea`
  border-radius: 10px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  width: 90%;
`;

const SMobileSendButton = styled.button`
  position: absolute;
  bottom: 6.5px;
  right: 5%;
  background: #222222;
  border: none;
  color: white;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;