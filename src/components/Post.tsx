import React, { useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styled from "styled-components";
import { DeletePost } from './DeletePost.tsx';
// import { LoginUserContext } from '../providers/LoginUserProvider.tsx';
import { getUser } from '../api/User.tsx';
import { UserContext } from '../providers/UserProvider.tsx';

export default function Post(props: any) {
  const { postOwnerId, post } = props;

  const { userInfo } = useContext(UserContext);
  // const { loginUser } = useContext(LoginUserContext);
  const [postOwnerImgSrc, setPostOwnerImgSrc] = useState<string>('https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/profileicon_default.png?raw=true');

  const getPostOwnerImgsrc = async () => {
    const postOwner = await getUser(postOwnerId, userInfo.token)
    setPostOwnerImgSrc(postOwner.imgSrc)
    console.log("postOwner:", postOwner)
  }

  const getDateStr = (dateObj: Date) => {
    const year = post.created_at.getFullYear();
    const month = post.created_at.getMonth() + 1;
    const date = post.created_at.getDate();
    const hour = post.created_at.getHours();
    const min = post.created_at.getMinutes();
    const sec = post.created_at.getSeconds();
	  return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const getLines = (src: string):ReactNode => {
    return src.split('\n').map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      )
    });
  }

  useEffect (() => {
    getPostOwnerImgsrc()
  }, [])
  
  return (
    <SPost>
      <SPostHeader>
        {/* <SPostHeaderRow> */}
          
        <SPostHeaderBox>
          <SUserProfileImage src={postOwnerImgSrc} alt='profileImage'/>
        </SPostHeaderBox>
        <SPostHeaderBox>
          <SNameDateBox>
            <SName>{post.user_name}</SName>
            <SDate>{getDateStr(post.craeted_at)}</SDate>
          </SNameDateBox>
        </SPostHeaderBox>

        {/* メッセージの削除ボタン */}
        <SPostHeaderBox>
          <DeletePost deleteid={post.id} postUserName={post.user_name}/>
        </SPostHeaderBox>
        {/* </SPostHeaderRow> */}
      </SPostHeader>

      <SPostContent>{getLines(post.content)}</SPostContent>
    </SPost>
  )
}


const SPost = styled.div`
  // margin: 8px 0px;
  margin: 10px;
  // border-bottom: 1px solid #AAAAAA;
  border: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
  padding-bottom: 8px;
`

const SPostHeader = styled.div`
  margin: 10px;
  display: flex;
`
const SPostContent = styled.div`
  margin: 10px;
`

// const SName = styled.span`
const SName = styled.div`
  // font-size: small;
  font-size: medium;
  color: #000044;
`

// const SDate = styled.span`
const SDate = styled.div`
  // margin-left: 8px;
  font-size: small;
  color: #000044;
`

const SUserProfileImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

// const SPostHeaderRow = styled.div`
//   display: flex;
// `;

const SPostHeaderBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
`;

const SNameDateBox = styled.div`
  width: 200px;
`;