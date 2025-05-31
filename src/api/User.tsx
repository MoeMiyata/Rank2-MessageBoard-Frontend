import axios from "axios";
import { hostUrl } from './hostUrl.ts';

// // ユーザ登録で追加
// export const createUser = async (name: string, email: string, password: string) => {
//   const url = hostUrl + `/user`;
//   // POSTリクエストでデータを送る際は、URLにパラメータを埋め込むのではなく、リクエストボディにデータを送信する
//   try {
//     const res = await axios.post(url, {
//       name,
//       email,
//       password
//     }); // リクエストボディにデータを送る;
    
//     // console.log('res(createUser):', res.data);
//     return res.data;

//   } catch (error: any) {
//     return error;
//   }
// }

export const requestEmailVerification = async (name: string, email: string, password: string) => {
  const url = hostUrl + `/user/request-verification`;
  console.log("In requestEmailVerification!:", url);
  try {
    const res = await axios.post(url, {
      name,
      email,
      password
    }); 
    // console.log('res(createUser):', res.data);
    return res.data;

  } catch (error: any) {
    return error;
  }
}


export const getUser = async (user_id: number, token: string) => {
  // const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  console.log(url)
  const res = await axios.get(url);

  // console.log('res(getUser):', res.data);
  return res.data;
};

// ユーザアイコン情報取得
export const getUserIcons = async (token: string) => {
  const url = hostUrl + `/user?token=${token}`;
  console.log(url)
  const res = await axios.get(url);

  // console.log('res(getUser):', res.data);
  return res.data;
};

// user情報更新
export const updateUser = async (user_id: number, token: string, name?: string, email?: string, password?: string, birthday?: string, address?: string, tel?: string, imgSrc?: string) => {
  console.log('In updateUser.\n')
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  // console.log('updateURL:', url)

  try {
    console.log('updateData:', {
      name,
      email,
      password,
      birthday,
      address,
      tel,
      imgSrc,
    })
    const res = await axios.put(url, {
      name,
      email,
      password,
      birthday,
      address,
      tel,
      imgSrc,
    });
    
    console.log('res(updateUser):', res.data);
    return res.data;

  } catch (error: any) {
    return error;
  }
};

// ユーザを削除
export const deleteUser = async (token: string, user_id: number) => {
  const url = hostUrl + `/user?token=${token}&user_id=${user_id}`;
  const res = await axios.delete(url);
  console.log('res(deleteUser):', res);
  return res.data;
}