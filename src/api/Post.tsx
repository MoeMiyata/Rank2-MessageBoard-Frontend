import axios from "axios";
import { hostUrl } from './hostUrl.ts';

export const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg
  };
  // const url = `http://localhost:3000/post?user_id=${user_id}&token=${token}`;
  const url = hostUrl + `/post?user_id=${user_id}&token=${token}`;
  const res = await axios.post(url, data);
  console.log('res(post):', res);
  return res.data;
}

export const getList = async (token: string) => {
  // const url = `http://localhost:3000/post?token=${token}&records=10`;
  const url = hostUrl + `/post?token=${token}&start=0&records=10`;
  // const url = hostUrl + `/post?token=${token}&start=${start}&records=10`;
  const res = await axios.get(url);
  console.log('res(getList):', res);
  return res.data;
};

// サーバのポート番号3000, frontのポート番号3001