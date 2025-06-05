import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { hostUrl } from '../api/hostUrl.ts';
import toast from 'react-hot-toast';
import styled from 'styled-components';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [ isVerifyEmail, setIsVerifyEmail ] = useState(false);
  const [ params ] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      axios
        .post(`${hostUrl}/user/verify-email`, { token })
        .then((res) => {
          toast('メール認証が完了しました', { icon: <i className="fas fa-check-circle" style={{color: 'green'}}></i> })
          // 自分のウィンドウを閉じる
          // window.close();
          setIsVerifyEmail(true);
        })
        .catch((err) => {
          toast('認証に失敗しました', { icon: <i className="fas fa-times-circle" style={{color: 'red'}}></i> })
        });
    }
  }, [token]);

  const onBackToLoginClick = async () => {
    navigate("/");
  };

  return (
    <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      {isVerifyEmail ? 
        <div>
          <span>ログイン画面からログインをお願いします</span>
          <SLoginButton type="button" onClick={onBackToLoginClick}>
            Back to Login
          </SLoginButton>
        </div>
       : 
        <div>
          <i className="fas fa-spinner fa-pulse"></i>
          <span>  メール認証を確認しています...</span>
        </div> }
    </div>
  );
};



const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
`;