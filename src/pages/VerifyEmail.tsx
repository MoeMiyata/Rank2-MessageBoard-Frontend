import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { hostUrl } from '../api/hostUrl.ts';
import toast from 'react-hot-toast';

export const VerifyEmail = () => {
  const [ params ] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      axios
        .post(`${hostUrl}/user/verify-email`, { token })
        .then((res) => {
          toast('メール認証が完了しました', { icon: <i className="fas fa-check-circle" style={{color: 'green'}}></i> })
          // 自分のウィンドウを閉じる
          window.close();
        })
        .catch((err) => {
          toast('認証に失敗しました', { icon: <i className="fas fa-times-circle" style={{color: 'red'}}></i> })
        });
    }
  }, [token]);

  return <div>メール認証を確認しています...</div>;
};
