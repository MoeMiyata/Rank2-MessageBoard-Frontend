// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { PageLinkContext } from '../providers/PageLinkProvider.tsx';
// import { UserContext } from '../providers/UserProvider.tsx';
// import { getList } from '../api/Post.tsx';

// export default function PageLink() {
//     const { userInfo } = useContext(UserContext);
//     const { pageNumber } = useContext(PageLinkContext);
//     const { setPageNumber } = useContext(PageLinkContext);

//     const [isExistNextPage, setIsExistNextPage] = useState<boolean>(false); // 次ページがあるかどうかの状態管理

//     // const judgeOfNextPage = async () => {
//     //     const posts = await getList(userInfo.token, pageNumber+10); // +20にしているのはstateの更新とレンダリングのタイミングが合わないので帳尻合わせで10->20に変更  -> 合わなかったのでまた10に戻した
//     //     console.log("judgeOfNextPage(posts):", posts);
//     //     setIsExistNextPage(posts.length > 0);
//     // }
//     const judgeOfNextPage = async () => {
//       const nextPage = pageNumber + 10;
//       const posts = await getList(userInfo.token, nextPage);
//       console.log("judgeOfNextPage(posts):", posts);
//       setIsExistNextPage(Array.isArray(posts) && posts.length > 0);
//   }


//     const onBeforePageClick = async () => {
//         // await setPageNumber((prevPage) => prevPage -= 10);
//         setPageNumber((prevPage) => prevPage -= 10);
//     }

//     const onNextPageClick = async () => {
//         // await setPageNumber((prevPage) => prevPage += 10);
//         setPageNumber((prevPage) => prevPage += 10);
//     }


//     useEffect(() => {
//         judgeOfNextPage();
//     }, [pageNumber]); 
    

// 	return (
//         <SPageLink>
//             <SPageLinkRow>
//                 { !(pageNumber<10) ? <SPageLinkBeforeButton onClick={onBeforePageClick}>前へ</SPageLinkBeforeButton> : null }
//                 { (isExistNextPage) && <SPageLinkNextButton onClick={onNextPageClick}>次へ</SPageLinkNextButton> }
//                 {/* { ((pageNumber<10)||isExistNextPage) && <SPageLinkNextButton onClick={onNextPageClick}>次へ</SPageLinkNextButton> } */}
//             </SPageLinkRow>
//         </SPageLink>
// 	)
// }


// const SPageLink = styled.div`
//   padding: 8px;
//   margin-bottom: 8px;
// `

// const SPageLinkRow = styled.div`
//   margin-top: 4px;
//   margin-bottom: 4px;
//   text-align: rigth;
// `

// const SPageLinkBeforeButton = styled.button`
//   background-color: #222222;
//   padding: 4px;
//   border-radius: 8px;
//   color: #FAFAFA;
//   width: 100%;
//   width: 15%;
// `

// const SPageLinkNextButton = styled.button`
//   background-color: #222222;
//   padding: 4px;
//   border-radius: 8px;
//   color: #FAFAFA;
//   width: 100%;
//   width: 15%;
// `

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

    // 次ページがあるかを確認する関数
    const judgeOfNextPage = async (page: number) => {
      const posts = await getList(userInfo.token, page);
      console.log("judgeOfNextPage(posts):", posts);
      setIsExistNextPage(Array.isArray(posts) && posts.length > 0);
    }

    // ページ遷移前に次ページの判定を行う関数
    const onBeforePageClick = async () => {
        // 現在のページ番号から前のページに移動
        setPageNumber((prevPage) => prevPage - 10);
    }

    // ページ遷移後に次ページの判定を行う関数
    const onNextPageClick = async () => {
        // 現在のページ番号から次のページに移動
        setPageNumber((prevPage) => prevPage + 10);
    }

    // `useEffect` で `pageNumber` が変更されたときに次ページを確認
    useEffect(() => {
        const nextPage = pageNumber + 10;
        judgeOfNextPage(nextPage); // 次のページが存在するか判定
    }, [pageNumber]);  // pageNumberが変更されたときに再実行

    return (
        <SPageLink>
            <SPageLinkRow>
                { !(pageNumber < 10) && <SPageLinkBeforeButton onClick={onBeforePageClick}>前へ</SPageLinkBeforeButton> }
                { isExistNextPage && <SPageLinkNextButton onClick={onNextPageClick}>次へ</SPageLinkNextButton> }
            </SPageLinkRow>
        </SPageLink>
    )
}

const SPageLink = styled.div`
  padding: 8px;
  margin-bottom: 8px;
`;

const SPageLinkRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: right;
`;

const SPageLinkBeforeButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  width: 15%;
`;

const SPageLinkNextButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  width: 15%;
`;
