import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      axios
        .post('https://rank2-messageboard-backend.onrender.com/user/verify-email', { token })
        .then((res) => {
          alert('✅ メール認証が完了しました！');
        })
        .catch((err) => {
          alert('❌ 認証に失敗しました');
        });
    }
  }, [token]);

  return <div>メール認証を確認しています...</div>;
};
