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
    // エラーがある場合、詳細を取得
    if (error.response) {
      // サーバーからのレスポンスにエラーが含まれている場合
      console.error("Error response:", error.response.data);
      
      // エラーが存在する場合、エラーメッセージを返す
      throw new Error(error.response.data.message || "ユーザー登録に失敗しました。");

    } else if (error.request) {
      // リクエストが送信されていない場合（ネットワークエラーなど）
      console.error("Error request:", error.request);
      throw new Error("サーバーに接続できません。ネットワークを確認してください。");

    } else {
      // 他のエラーが発生した場合
      console.error("Error message:", error.message);
      throw new Error("予期しないエラーが発生しました。");
    }
  }
}

export const getUser = async (user_id: number, token: string) => {
  // const url = `http://localhost:3000/user/${user_id}?token=${token}`;
  const url = hostUrl + `/user/${user_id}?token=${token}`;
  const res = await axios.get(url);

  console.log('res(getUser):', res.data);
  return res.data;
};