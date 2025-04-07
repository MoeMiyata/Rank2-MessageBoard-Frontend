// import React, { useState } from 'react';
// import { Dropbox } from 'dropbox'; // Dropbox SDKをインポート

// export const DropboxUpload = () => {
//   const [image, setImage] = useState(null); // 画像を保存
//   const [uploading, setUploading] = useState(false); // アップロードの進行状態
//   const [imageUrl, setImageUrl] = useState(''); // アップロード後の画像URL

//   const accessToken = 'sl.u.AFq6VE4azKumhvgnXiumMiNLhhgPVo1-IFsX4mikn4ov1cUZFMjoywSfuRZDZXWDfSZGmxJqs1I2UELoqnHzu9d2XT9nWdc6xs1B6XnEWQawMQ-Npy20ykmNq0s6VSBqmACl9buhGSNp_5BhdQOpyuT4RXULCfcsgRPHGNvGMHa3lmkwpuI9JWNSSma8KT5s2oZzU6Ac6mSM51MSiM5QxQqV3kCfzYpyvwyAY394j6zYAp2eyOj86bVCWrxebgXU4zdzY53aFp4CQ_FG3SpRfidpxSOC6-jdJmtV7aMItrZ8utpdY0qZv8NtU-JAsb___POTkrLJcY5wYJFoKbWK_NBwMoOA5noTaBJd-QBjDvu1sS6uAqp6e46n6agg1P32mmwrvGWn0eCjYUR8kiwK5p8sT3htnBGby4HXSoaY93kb7rQXGjs2aK_4A1X9GSzgXez9oXD1ZViuT9ZRIGsZ28yrxMFvKVe9htQbDDUuJ0Ntv0iwyyhboS2ITNKOA_FceN_7PNByGBJ3iabUqqN630bWNNE-D9geTTcISwVH_EFUKeOBGkIJHc31IWfzeIMbf4DVoDkKv-vl6q3-Jd4qABvS-1cu9kv02g-mWicsqfKXim7nAeHXw6Ol6YGd0BeAyRQyeIN8D_lBgDodlnudnQVw4Ba9j2j1hTr8ejiEXBSV690RiMfQYw-cVY5kCPw6FsffTfjzNSRAVov9hl2XFZY6p6jEoladYHbwQioiUt_M68-cZ-qTPvmwDNWSEitiLq3yjE9gfDyttdQd3QSf-2UUKn3cygz3y-de40x3Y-lSH6LY0J0t_ATjhCxa2SMNbnkWUYmW63EWTXVsw1ieJTeNO_cr-9hRumw2OeA1vH0Dr8xZ052J9H7sTUqM9XyGkOxznFbaoyMiRZEe5VM9UqCBL5s7qWNVs1-DOGJGpDG9a1gqWOz2Y84ZAmOmlPoSCYB5bl4yMRo3MnsatQRI5hIjcy26CXkB4NRJw5azqHAGDv4gXcuF7myo5rH_MKNNthkvG7VvLbnSQxTHw_ZPFd6NfSZdz0Z4SjHvR7CKOrTj6usCpjHHc8DQteFW0tn82ZIrF-omwjw9fZLGtEYAchOqqYf0GdZ75zsHxpl7rw7NXeRysQ4ghkDOBlhDERqy_zNNW_12-tpAv86VR_i1-slg4tBxmFlQNMxNeymM_MfuENiKffLzYalFfjZddNETJMaWpCVHe0MSxWcUGATU9xOLsuZRhK3kJG7wY0z5REQ_NPXhRPPGbgaM7bdiysG_FHg4sFCTxdJlmzlq9ntH3Aamj5TBlfybTZiikjtVMCCyJCkZzsNz2uXx1J5P-fok_9qcdI2Xf_v_cqVR5pBW4FgHxylG65wRVVMLDiiQMqTjYMNP-r4kqpeSrsnTDg38yf9j8bx5FR1gWcjUkPtgrHVvvIgWd8JpJWfSQ6_o9w-EaQ'; // 生成したアクセストークンを設定

//   // 画像選択
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   // 画像をDropboxにアップロード
//   const handleUpload = async () => {
//     if (!image) return;

//     setUploading(true);

//     const dbx = new Dropbox({ accessToken }); // Dropbox SDKを初期化

//     // ファイルをDropboxにアップロード
//     try {
//       const response = await dbx.filesUpload({
//         path: '/' + image.name, // ファイルのパス（Dropbox内の保存先）
//         contents: image, // アップロードするファイル
//       });

//       // アップロードが成功したら、画像のリンクを取得
//       const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
//         path: response.result.path_display,
//       });

//       setImageUrl(sharedLinkResponse.result.url); // 画像のURLを設定
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>画像アップロード (Dropbox)</h2>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? 'アップロード中...' : 'アップロード'}
//       </button>

//       {imageUrl && (
//         <div>
//           <h3>アップロードされた画像:</h3>
//           <img src={imageUrl} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropboxUpload;


import React, { useState } from 'react';
import { Dropbox } from 'dropbox'; // Dropbox SDKをインポート
// import Dropbox from 'dropbox';  // ブラウザ向けSDKをインポート

export const DropboxUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const accessToken: string = 'sl.u.AFppm5Fg2bYKXvA5rTFtETY_XHGLc7WV464mi-nd3EKoq3JM95CHaTt-10V-n3F0hvSTH5JrX0wG0SJkgXRtFWvaYJzSq1pFbyiRcs4YQpfARCnkCqnNopZUGcrOp61trraAdhSlzVey-dpBz3Me-NAA5Ti5plYPV4ej6aX0EJ7noD8RKvoY6Qo5llShqjaMK-gyJxzUa9_1Gjuraj7vRIesAvM59RBhJuL8c3259vXxTCnAYweFXkoxBEn7Hx2FDKbv9lSAWg2EfQH9B3YfKpzK-Ug4vqe6Pw3q_AiV4qtl9lQnoQ-IQ77NjXxv2v7TpkiRFKlcfO8tVLUpzV8OSkeqPeldJDkUVaEG7gfWfCaYellDGaXJKDq9ebNo6OFe-l2PzVNmCD93eH1gGWJ-oNVXIvDrcx5O7ydRgU5xQo-oVTtlZ4iIFvNcfmAx7aFKgxW1gO5pkgl9Xu6qn1ruhC3WL8KBCrmkLTScPumTBqUDavVDp68p6XRsOj6QTokPmM3Fn9FOzjImt2rsHZwysL7XdUQmkWuzstRl2HzkTCjdfGWqKLrI8uXWD9srJ8QfG6-Ykuk2Zwq-dMvWs3EtdyTbtyWN2MxZuQ49kehc6JGmuptqRIC2w8cvJU-Xk0eIH6luNyJWHZP6QsQJLeIhMxZiMYludHHCSeYK8qFlq08xyaO52kbw7_hAZ69oYjaBCy3NjmbcCxQPDVnv_Bp57aeKMNzzGTTS9kL5MUlCYglHf6Iy23tgapMrZIgMyAkAvxE6EPrBZwY2ykjxiuZzmggbEuwu4UM9Tzoaw20vvQn-_hMp2d2eJ3bleVsRaTsxmNwGf5DiedVVAWvs8IOAq86PpGjSem87xQRNnrxQF42oIhyNYXDLEpleFA4pFmwbDTL5Xt_rsXoygZuehlBR8vI_WTXVxzUWwYN-tlWv9n0fEtDqFnyEf5EmA3c1sCm4KLFTrlo1J4-qkAFyh-2bPiZyVp7TKCdgAHyypiegcLPSU05HWce0fEKG3yDzP8ObBG7Ol8LEYuKnVQyP-pk4ONGDvrP5sWF0Gzpdm6yZExr_vQND_3r3vGod7YWbzVs4Z_1rfKEY51lqFona293lwNImUiBTXUlArSdntbQw5B3-pXqHzJEkeE8PWFoZ52oNYoNaZs4TCKkMahd8gM-tXlkiThIrKQPzGPGT7hYAgwIrqoxcbKUHkxl6-M5eeZyHroCpLXpoo5o_d7zeoM0FDASsdTjPQEmaQAH2n9Sf6bm27g5HOtFdATQV25PwI8RFdduTAUVnhXpPQKt6Vb-_fFGREXhQ1boghReNuGLvEkTvcc0nbz7AInzG554s4ZRwsavO32LeOXmM0IE4sDX4l1zoGeqCwgoso3nXf5UI4zp6csWoQPGSZkzGPJyciVRCjmYGWjUsinKdm-60_E39S5BJvLr2esLMVadIynpP9uo0zQ';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log('file:', file);
    }
  };

  const handleUpload = async (): Promise<void> => {
    console.log('In handleUpload');

    if (!image) return;

    const encodedFileName = encodeURIComponent(image.name); // ファイル名をURLエンコード
    console.log(image.name)
    console.log(encodedFileName)

    setUploading(true);

    const dbx = new Dropbox({ accessToken });
    console.log(dbx);

    try {
      const response = await dbx.filesUpload({
        path: 'https://www.dropbox.com/home/App/Rank2-MessageBoard/' + encodedFileName,
        contents: image,
      });

      console.log(image.name)
      console.log(image)

      // path_display が undefined でないことを確認
      const pathDisplay = response.result.path_display;
      if (!pathDisplay) {
        console.error('Error: path_display is undefined');
        return;
      }

      // path_display がある場合にのみ共有リンクを作成
      const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: pathDisplay, // 正しい型を保証
      });

      setImageUrl(sharedLinkResponse.result.url);
    } catch (error) {
      console.error('image:', image);

      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>画像アップロード (Dropbox)</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'アップロード中...' : 'アップロード'}
      </button>

      {imageUrl && (
        <div>
          <h3>アップロードされた画像:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
};