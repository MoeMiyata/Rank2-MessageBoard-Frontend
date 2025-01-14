// import React, { useContext, useEffect } from 'react';
// import { UserContext } from '../providers/UserProvider.tsx';

// const PageUnloadLogger = () => {
//     const { userInfo } = useContext(UserContext);

//     useEffect(() => {
//         const handleBeforeUnload = (e: Event) => {
//             const navigationType = (window?.performance?.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;

//             switch (navigationType) {
//                 case "navigate":
//                     console.log(navigationType + " : ページ遷移");
//                     break;
//                 case "reload":
//                     const loggedIn = (userInfo.token !== '');
// 	                console.log('loggedIn:', loggedIn);

//                     console.log(navigationType + " : ページ更新");

//                     alert('reload')
//                     break;
//                 case "back_forward":
//                     console.log(navigationType + " : 戻る・進む");
//                     break;
//                 case "prerender":
//                     console.log(navigationType + " : prerender");
//                     break;
//                 default:
//                     console.log("不明な遷移タイプ");
//             }
//         };

//         // beforeunload イベントの設定
//         window.addEventListener('beforeunload', handleBeforeUnload);

//         // クリーンアップ処理（アンマウント時にイベントリスナーを削除）
//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []); // 空の依存配列でコンポーネントのマウント時に1回だけ実行

//     return (
//         <div>
//             <h1>ページ遷移の監視</h1>
//             <p>ページ遷移を監視して、コンソールに遷移タイプをログ出力します。</p>
//         </div>
//     );
// };

// export default PageUnloadLogger;


import React from "react";
import styled from "styled-components";

export const ReloadPage = () => {
    return (
        <SPageLinkNextButton><img src="https://github.com/MoeMiyata/Rank2-MessageBoard-Frontend/blob/main/public/reloadicon_white.png?raw=true" alt="button" width="30" height="30" /></SPageLinkNextButton>
    )
}

const SPageLinkNextButton = styled.button`
  background-color: #222222;
//   padding: 4px;
//   border-radius: 8px;
  color: #FAFAFA;
//   width: 100%;
//   width: 15%;
    position: fixed;
    top: 50px;
    right: 10px;
    padding: 3px 5px 0px 4px;
    border-radius: 50%;
`