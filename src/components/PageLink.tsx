import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageLinkContext } from '../providers/PageLinkProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from '../api/Post.tsx';

export default function PageLink() {
    const { userInfo } = useContext(UserContext);
    const { pageNumber } = useContext(PageLinkContext);
    const { setPageNumber } = useContext(PageLinkContext);

    const [isExistNextPage, setIsExistNextPage] = useState<boolean>(false); // 次ページがあるかどうかの状態管理

    const judgeOfNextPage = async () => {
        const posts = await getList(userInfo.token, pageNumber+10); // +20にしているのはstateの更新とレンダリングのタイミングが合わないので帳尻合わせで10->20に変更  -> 合わなかったのでまた10に戻した
        console.log("judgeOfNextPage(posts):", posts);
        setIsExistNextPage(posts.length > 0);
    }


    const onBeforePageClick = async () => {
        // await setPageNumber((prevPage) => prevPage -= 10);
        setPageNumber((prevPage) => prevPage -= 10);
    }

    const onNextPageClick = async () => {
        // await setPageNumber((prevPage) => prevPage += 10);
        setPageNumber((prevPage) => prevPage += 10);
    }


    useEffect(() => {
        judgeOfNextPage();
    }, [pageNumber]); 
    

	return (
        <SPageLink>
            <SPageLinkRow>
                { !(pageNumber<10) ? <SPageLinkBeforeButton onClick={onBeforePageClick}>前へ</SPageLinkBeforeButton> : null }
                { ((pageNumber<10)||isExistNextPage) && <SPageLinkNextButton onClick={onNextPageClick}>次へ</SPageLinkNextButton> }
            </SPageLinkRow>
        </SPageLink>
	)
}


const SPageLink = styled.div`
  padding: 8px;
`

const SPageLinkRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: rigth;
`

const SPageLinkBeforeButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  width: 15%;
`

const SPageLinkNextButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  width: 15%;
`