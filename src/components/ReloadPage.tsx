import React, { useEffect } from 'react';

const PageUnloadLogger = () => {
    useEffect(() => {
        const handleBeforeUnload = (e: Event) => {
            const navigationType = (window?.performance?.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;

            switch (navigationType) {
                case "navigate":
                    console.log(navigationType + " : ページ遷移");
                    break;
                case "reload":
                    console.log(navigationType + " : ページ更新");
                    break;
                case "back_forward":
                    console.log(navigationType + " : 戻る・進む");
                    break;
                case "prerender":
                    console.log(navigationType + " : prerender");
                    break;
                default:
                    console.log("不明な遷移タイプ");
            }
        };

        // beforeunload イベントの設定
        window.addEventListener('beforeunload', handleBeforeUnload);

        // クリーンアップ処理（アンマウント時にイベントリスナーを削除）
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // 空の依存配列でコンポーネントのマウント時に1回だけ実行

    return (
        <div>
            <h1>ページ遷移の監視</h1>
            <p>ページ遷移を監視して、コンソールに遷移タイプをログ出力します。</p>
        </div>
    );
};

export default PageUnloadLogger;
