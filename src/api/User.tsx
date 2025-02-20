import axios from "axios";
import { hostUrl } from './hostUrl.ts';

// ユーザ登録で追加
// export const createUser = async (name: string, email: string, password: string) => {
//   const url = hostUrl + `/user`;
//   // POSTリクエストでデータを送る際は、URLにパラメータを埋め込むのではなく、リクエストボディにデータを送信する
//   const res = await axios.post(url, {
//     name,
//     email,
//     password
//   }); // リクエストボディにデータを送る;
//   console.log('res(createUser):', res.data);
//   return res.data;
// }
export const createUser = async (name: string, email: string, password: string) => {
  const url = hostUrl + `/user`;

  try {
    const res = await axios.post(url, {
      name,
      email,
      password
    });
    
    console.log('res(createUser):', res.data);
    return res.data;

  } catch (error: any) {
    return error;
  }
}

export const getUser = async (user_id: number, token: string) => {
  // const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  console.log('res(getUser):', res.data);
  return res.data;
};