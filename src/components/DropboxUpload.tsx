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

  const accessToken: string = 'sl.u.AFr60kxu-fLlmuTwDI0mKU55D-LX8mM3SftHjiPKw82jIiEHecKhpziYYdrCk8jR4QoOlF7q3ZeOuyb8uqiyfbwy1Q-jugBmmH7GSk92RpBK8yCt4pJPmmyRF2E_R_bdc-AMJubxvX6bxOW6cjfWZWJm1ztc0UtfTiaTBjAaUwwBDw-QYAm3Ynnvb7bmYI3fs2ErcbpJxWePPT-vL1phxP4l2i5ryqpLWLQh5cSajvqMBnOih-oMTDnAWGCCUT-wxNVZm0A8l6ELQyYAgjwBo5dIIVxXxZKCSZXwKDAyIttVQ8tpnm9WII6Xy9AgSEBW70seWJoU7rIabxEqcsyJHot2lZPSs9_CCBZkffRq9m3dh-anvLJyTEpQ5-9p19bZfHm7pBxq5U-aTBqTSclcoqEKfMJCD3jRb9uWLDaAXqlyq3gAnB1KUK730s3CRRJhGq2HFNHQFqq-nNBdMsZCu_4B3Wp0hj4XOEIFE8rvK_jBRiOv4Z5E9zJPDHf7RKoaGwZTMWzLbdv-MpMtUBKGMatbydfNNUyPgWyE4NcqP8JKf-OydCcCYPwKwsTqyi_rDGXFP1XAdW24Ig9xHA4FsYlyHOBkuQo103_-fZvi4kJfWcYwTpj3xpZ_5_IjLSkh9a1NOJLWKmCDuBUFl8G0tvwZKDDJCYFZ8BqWpThCO5lGcB7ykZHL9wK7Uu26q3dfi1uqt_G-hOJLJZmm2ujEpcduv5C8HD_DfeTIU53Sxj-h4GyurPpdddh_UvtSXGndays6oqGYuV7svCeWGEHBndPJlm4dWLjdO5z0Q9Wnf9nUta9E69zYJoIEan6BlX82hahqxCo7rBKL4WwitWVGCtwLhfzowXBO33kAUmHDcGAtD6ebtmvuaG23KZtwhwFMxOU5UPBUFw_hqzLyhaUmGXBoS-94725AxBJK14OsCN5QmnFoD22UgCE_WaFPVIchwNndaluvutxwZXmAJTm_xtbu2eKznnBGonW6MxosEX8AeU_v-m4TwjaU-EqmBCMWuR3VClgW9hII82IazGrqL-sllhGXXHkG0oeXb_QenUIG32ahh3uyKC6TFWJuEsBOO2qRYbD2iyEilIeQ_p8hnOjyDzFEHgi3fFyyxZb4-jT9CiDMWL3gGsP1GBd-rxiCzjW96XjRdHuziWk8WqXeROHYZ5HF3sg-6HlZYpicQXf1Xbh0M9OK1IVhy5X_ANbOFYe_1VTlB2PYJo_KdmvmOdqGBEwN0n78Mjg1D1HhhRtr2fAV9S-0FGlnFMhBGHQUgPZVMhfxOU9cmPvbT2YpXjqX2pGOxObs10PIU8So_T1Jd6jRO4AWUTVXOfu92aBt0kzGBEqrcG9kwBA6X68US6ILntwpRIPFc78pGflboYsxE7SZgos9EFE-WyyEYQlyMPNLECdMD0uPJUmMtcYeFVRKUUr6m93-anLs1zRdPgztnA';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!image) return;

    setUploading(true);

    const dbx = new Dropbox({ accessToken });

    try {
      const response = await dbx.filesUpload({
        path: 'https://www.dropbox.com/home/App/Rank2-MessageBoard/' + image.name,
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