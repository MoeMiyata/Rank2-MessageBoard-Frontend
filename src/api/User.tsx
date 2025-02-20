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
    console.log('catch in!')
    // エラーがある場合、詳細を取得
    // if (error.response) {
    //   // バックエンドからエラーレスポンスが返された場合
    //   const errorMessage = error.response.data.message || 'ユーザー登録に失敗しました';
    //   console.error('Error response:', error.response);
    //   throw new Error(errorMessage); // エラーメッセージをスロー
    // } else if (error.request) {
    //   // リクエストがサーバーに送信されたがレスポンスが無かった場合
    //   console.error('Error request:', error.request);
    //   throw new Error('サーバーからのレスポンスがありません');
    // } else {
    //   // その他のエラー
    //   console.error('Error message:', error.message);
    //   throw new Error('エラーが発生しました');
    // }
    alert('ユーザ登録に失敗しました．')
  }
}

export const getUser = async (user_id: number, token: string) => {
  // const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  console.log('res(getUser):', res.data);
  return res.data;
};