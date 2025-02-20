import axios from 'axios';
import { hostUrl } from './hostUrl.ts';

export const sign_in = async (user_id: string, pass: string) => {

  try {
    // const url = `http://localhost:3000/auth?user_id=${user_id}&pass=${pass}`;
    const url = hostUrl + `/auth?user_id=${user_id}&pass=${pass}`;
    console.log(url);
    console.log(hostUrl);
    

    const res = await axios.get(url);
    console.log(res);

    return res.data;
  } catch (error: any) {
    alert('ログイン情報に誤りがあります．')
  }
};