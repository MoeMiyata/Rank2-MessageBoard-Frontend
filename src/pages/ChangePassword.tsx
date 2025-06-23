import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { hostUrl } from '../api/hostUrl.ts';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { updateUser } from '../api/User.tsx';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmNewPassword, setConfirmNewPassword ] = useState("");
  const [ isNewPassword, setIsNewPassword ] = useState(false);
  const [ params ] = useSearchParams();
  const token = params.get('token');

  const [ payload, setPayload ] = useState<{ token: string; id: number, name: string; email: string }>({ token: "xxx-xxx-xxx", id: 0, name: "xxx", email: "xxx" });
  const [ record, setRecord ] = useState(null);

  const [isRevealNewPassword, setIsRevealNewPassword] = useState(false);
  const toggleNewPassword = () => {
    setIsRevealNewPassword((prevState) => !prevState);
  }

  const [isRevealConfirmNewPassword, setIsRevealConfirmNewPassword] = useState(false);
  const toggleConfirmNewPassword = () => {
    setIsRevealConfirmNewPassword((prevState) => !prevState);
  }

  useEffect(() => {
    if (token) {
      axios
        .post(`${hostUrl}/user/verify-password`, { token })
        .then((res) => {
          toast('メール認証が完了しました', { icon: <i className="fas fa-check-circle" style={{color: 'green'}}></i> })
          setPayload(res.data.payload)
          setRecord(res.data.record)
          console.log("payload, record:", res.data.payload, res.data.record)
        })
        .catch((err) => {
          toast('認証に失敗しました', { icon: <i className="fas fa-times-circle" style={{color: 'red'}}></i> })
        });
    }
  }, [token]);

  const onChangePasswordClick = async () => {
    if (newPassword !== confirmNewPassword) {
      return toast('パスワードが一致していません。', { icon: <i className="fas fa-times-circle" style={{color: 'red'}}></i> })
    }
    else {
      setIsNewPassword(true)
      console.log("newPassword:", newPassword)
      console.log("payload.token, record, newPassword:", payload.token, record, newPassword)
      await updateUser(payload.token, payload.id, record, '', '', newPassword);
      toast('パスワードの再設定が完了しました', { icon: <i className="fas fa-check-circle" style={{color: 'green'}}></i> })
    }
  }

  const onBackToLoginClick = async () => {
    navigate("/");
  };

  return (
    <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      {isNewPassword ? 
        <div>
          <div style={{ marginBottom: '50px' }}>ログイン画面からログインをお願いします</div>
          <SLoginButton type="button" onClick={onBackToLoginClick}>
            Back to Login
          </SLoginButton>
        </div>
       : 
        <SChangePassFrame>
          <div style={{ margin: "20px"}}>パスワードを再設定してください。</div>

          <SChangePassRow>
            <SChangePassContainer>
              <SChangePassLabel>
                  <label htmlFor="password">新しいパスワード</label>
              </SChangePassLabel>
              <SChangePassData>
                  <SChangePassInput>
                      <input
                      id="password"
                      value={newPassword}
                      type={isRevealNewPassword ? 'text' : 'password'}
                      onChange={(evt) => setNewPassword(evt.target.value)}
                      />
                      <span onClick={toggleNewPassword}  role="presentation" className="eye-icon">
                      <i className={isRevealNewPassword ? "fas fa-eye" : "fas fa-eye-slash"} />
                      </span>
                  </SChangePassInput>
              </SChangePassData>
            </SChangePassContainer>
          </SChangePassRow>

          <SChangePassRow>
            <SChangePassContainer>
              <SChangePassLabel>
                  <label htmlFor="password">新しいパスワード（確認）</label>
              </SChangePassLabel>
              <SChangePassData>
                  <SChangePassInput>
                      <input
                      id="password"
                      value={confirmNewPassword}
                      type={isRevealConfirmNewPassword ? 'text' : 'password'}
                      onChange={(evt) => setConfirmNewPassword(evt.target.value)}
                      />
                      <span onClick={toggleConfirmNewPassword}  role="presentation" className="eye-icon">
                      <i className={isRevealConfirmNewPassword ? "fas fa-eye" : "fas fa-eye-slash"} />
                      </span>
                  </SChangePassInput>
              </SChangePassData>
            </SChangePassContainer>
          </SChangePassRow>
          <SLoginButton onClick={onChangePasswordClick}>送信</SLoginButton>
        </SChangePassFrame> }
    </div>
  );
};


const SChangePassFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
  width: 80%;
`;

const SLoginButton = styled.button`
  margin: 20px;
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const SChangePassLabel = styled.span`
  display: inline-block;
  width: 50%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SChangePassContainer = styled.span`
  display: flex;
`

const SChangePassInput = styled.span`
  display: inline-block;
  position: relative;
  // display: inline-block;
  // width: auto;
  vertical-align: top;
  margin-left: 4px;

  input {
    padding-right: 30px; /* アイコン分の余白 */
  }

  .eye-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
  }
`;

const SChangePassData = styled.span`
  display: inline-block;
  width: 50%;
  vertical-align: top;
  text-align: left;
  margin-right: 4px;
`;

const SChangePassRow = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;