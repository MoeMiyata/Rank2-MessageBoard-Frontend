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

export const getList = async (token: string, pageNumber: number, kwd: string = '') => {
  // const url = `http://localhost:3000/post?token=${token}&records=10`;
  const url = hostUrl + `/post?token=${token}&start=${pageNumber}&records=10&keyword=${kwd}`;
  const res = await axios.get(url);
  console.log('res(getList):', res);
  return res.data;
};

// サーバのポート番号3000, frontのポート番号3001

// 特定の投稿を削除
export const deletePost = async (token: string, id: number) => {
  const url = hostUrl + `/post?token=${token}&id=${id}`;
  const res = await axios.delete(url);
  console.log('res(deletePost):', res);
  return res.data;
}