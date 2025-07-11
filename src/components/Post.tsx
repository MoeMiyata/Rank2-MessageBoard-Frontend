import React, { useContext, useRef, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styled from "styled-components";
import { DeletePost } from './DeletePost.tsx';
import { UserIconContext } from "../providers/UserIconProvider.tsx";
import { EditPost } from './EditPost.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { updatePost } from '../api/Post.tsx';
import { getLinkedContentHTML } from './GetLinkedContentHTML.ts';
import { extractKeywords, getKeywordLinks } from '../api/Keywords.ts';
import { KeywordsLinksContext } from '../providers/KeywordLinksProvider.tsx';


export default function Post(props: any) {
  const { postOwnerName, post } = props;

  const [ isEditPost, setIsEditPost ] = useState(false)

  const [ editedContent, setEditedContent ] = useState("")

  const { userIcons } = useContext(UserIconContext);
  const { userInfo } = useContext(UserContext);
  const { keywordLinks, setKeywordLinks } = useContext(KeywordsLinksContext);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isEditPost && contentRef.current) {
      contentRef.current.focus();
      
      // カーソルを末尾に移動（任意）
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false); // false = 最後にカーソル
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditPost]);
  
  const isEditPostRef = useRef(isEditPost);
  useEffect(() => {
    isEditPostRef.current = isEditPost;
  }, [isEditPost]);



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

  const getImgSrc = (userName: string) => {
    const userIcon = userIcons.find(icon => icon.name === userName);
    if (userIcon) {
      return userIcon.imgSrc;
    }
    else {
      return 'https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/profileicon_default.png?raw=true'
    }
  }
  const postOwnerImgSrc = getImgSrc(postOwnerName);

  const onEditPostBlur = async(newContent: string) => {
    console.log("In onEditPostBlur !");
    console.log("post.id:", post.id, "のメッセージ編集");
    console.log("editedContent:", editedContent);
    console.log("isEditPost(onEditPostBlur):", isEditPost);
    setTimeout(async () => { // timeoutで動作を遅らせてみる
      setIsEditPost(false)
      await updatePost(userInfo.token, post.id, newContent);
    }, 200);

    await extractKeywords(newContent);
    const myGetkeywordLinks = async () => {
      const kwdLinks = await getKeywordLinks();
      setKeywordLinks(kwdLinks);
      console.log("keywordLinks(MainLayout):", kwdLinks);
    };
    myGetkeywordLinks();
  }
  

  return (
    <SPost>
      <SPostHeader>
        {/* <SPostHeaderRow> */}
          
        <SPostHeaderIconBox>
          <SUserProfileImage src={postOwnerImgSrc} alt='profileImage'/>
        </SPostHeaderIconBox>
        <SPostHeaderBox>
          <SNameDateBox>
            <SName isDeletedUser={!post.user_name}>{post.user_name ? post.user_name : "deleted user"}</SName>
            <SDate isDeletedUser={!post.user_name}>{getDateStr(post.craeted_at)}</SDate>
          </SNameDateBox>
        </SPostHeaderBox>

        {/* メッセージの削除ボタン */}
        <SPostHeaderBox>
          <EditPost editId={post.id} postUserName={post.user_name} isEditPost={isEditPost} isEditPostRef={isEditPostRef} setIsEditPost={setIsEditPost} editedContent={ editedContent }/>
          <DeletePost deleteId={post.id} postUserName={post.user_name}/>
        </SPostHeaderBox>
        {/* </SPostHeaderRow> */}

        <SMobilePostHeaderBox>
          <SNameDateBox>
            <SName isDeletedUser={!post.user_name}>{post.user_name ? post.user_name : "deleted user"}</SName>
            <EditPost editId={post.id} postUserName={post.user_name} isEditPost={isEditPost} isEditPostRef={isEditPostRef} setIsEditPost={setIsEditPost} editedContent={ editedContent }/>
            <DeletePost deleteId={post.id} postUserName={post.user_name}/>
          </SNameDateBox>
        </SMobilePostHeaderBox>
      </SPostHeader>

      <SPostContent
        ref={contentRef}
        isEditPost={isEditPost}
        contentEditable={isEditPost}
        onBlur={(e) => {
          const newContent = e.currentTarget.innerText.replace(/\n+$/, '')
          setEditedContent(newContent ?? post.content);
          onEditPostBlur(newContent);
        }}
      >
        {isEditPost
          ? editedContent || post.content
          : <span dangerouslySetInnerHTML={{ __html: getLinkedContentHTML(editedContent || post.content, keywordLinks) }} />
        }
      </SPostContent>
    </SPost>
  )
}


const SPost = styled.div`
  // margin: 8px 0px;
  margin: 10px;
  // border-bottom: 1px solid #AAAAAA;
  border: 1px solid #AAAAAA;
  border-radius: 8px;
  box-shadow: rgb(170, 170, 170) 0px 2px 2px;
  text-align: left;
  padding-left: 8px;
  padding-bottom: 8px;
`

const SPostHeader = styled.div`
  margin: 10px;
  display: flex;

  @media (max-width: 768px) {
    margin: 10px 10px 0px 10px;
  }
`

const SPostContent = styled.div<{ isEditPost: boolean }>`
  margin: 10px;
  // border: ${ ({isEditPost}) => isEditPost ? "1px solid #3680FF" : "none" };
  border-radius: 5px;
  padding: ${ ({isEditPost}) => isEditPost ? "8px" : "9px" };

  @media (max-width: 768px) {
    margin: 0px 10px 0px 10px;
    border-radius: 5px;
    padding: 0px 9px 7px 9px;
  }
`

// const SName = styled.span`
const SName = styled.div<{ isDeletedUser: boolean }>`
  // font-size: small;
  font-size: medium;
  // color: #000044;
  color: ${({ isDeletedUser }) => isDeletedUser ? "#959292" : "#000044"};
`

// const SDate = styled.span`
const SDate = styled.div<{ isDeletedUser: boolean}>`
  // margin-left: 8px;
  font-size: small;
  // color: #000044;
  color: ${({isDeletedUser}) => isDeletedUser ? "#959292" : "#000044" };
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const SPostHeaderIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SNameDateBox = styled.div`
  flex-grow: 1;
  width: 200px;
`;


const SMobilePostHeaderBox = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;