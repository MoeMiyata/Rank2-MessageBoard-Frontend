import axios from "axios";
import { hostUrl } from './hostUrl.ts';

// ユーザ登録で追加
export const createUser = async (name: string, email: string, password: string) => {
  const url = hostUrl + `/user/name=${name}&email=${email}&password=${password}`;
  const res = await axios.post(url);
  console.log('res(createUser):', res.data);
  return res.data;
}

export const getUser = async (user_id: number, token: string) => {
  // const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  console.log('res(getUser):', res.data);
  return res.data;
};