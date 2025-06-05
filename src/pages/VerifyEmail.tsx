import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { hostUrl } from '../api/hostUrl.ts';

export const VerifyEmail = () => {
  const [ params ] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      axios
        .post(`${hostUrl}/user/verify-email`, { token })
        .then((res) => {
          alert('メール認証が完了しました');
          // 自分のウィンドウを閉じる
          window.close();
        })
        .catch((err) => {
          alert('認証に失敗しました');
        });
    }
  }, [token]);

  return <div>メール認証を確認しています...</div>;
};
