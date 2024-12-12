import axios from 'axios';
import { hostUrl } from './hostUrl.ts';

export const sign_in = async (user_id: string, pass: string) => {
  // const url = `http://localhost:3000/auth?user_id=${user_id}&pass=${pass}`;
  const url = hostUrl + `/auth?user_id=${user_id}&pass=${pass}`;
  console.log(url);

  const res = await axios.get(url);
  console.log(res);

  return res.data; // 修正（ログイン後、メイン画面に遷移する）
};