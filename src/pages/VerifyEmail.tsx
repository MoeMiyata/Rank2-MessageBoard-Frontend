import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { hostUrl } from '../api/hostUrl.ts';

export const VerifyEmail = () => {
  const [ params ] = useSearchParams();
  const token = params.get('token');

  const navigate = useNavigate();

  useEffect(() => {
    // if (token) {
    //   axios
    //     .post(`${hostUrl}/user/verify-email`, { token })
    //     .then((res) => {
    //       alert('✅ メール認証が完了しました！');

    //       // 元のウィンドウが存在する場合、/main に遷移させる
    //       if (window.opener && !window.opener.closed) {
    //         window.opener.location.href = '/main';
    //         window.close(); // 認証用のこのタブを閉じる
    //       } else {
    //         // 親ウィンドウがない場合は自分で遷移
    //         window.location.href = '/main';
    //       }
    //     })
    //     .catch((err) => {
    //       alert('❌ 認証に失敗しました');

    //       if (window.opener && !window.opener.closed) {
    //         window.opener.location.href = '/signup';
    //         window.close();
    //       } else {
    //         window.location.href = '/signup';
    //       }
    //     });
    // }
    if (token) {
      axios
        .post(`${hostUrl}/user/verify-email`, { token })
        .then((res) => {
          alert('✅ メール認証が完了しました！');
          // 元の画面にメッセージを送信
          if (window.opener) {
            console.log("opener exists!");
            window.opener.postMessage({ type: 'email-verified' }, `${hostUrl}`);
          }
          // 自分のウィンドウを閉じる
          window.close();
        })
        .catch((err) => {
          alert('❌ 認証に失敗しました');
        });
    }
  }, [token]);

  return <div>メール認証を確認しています...</div>;
};
