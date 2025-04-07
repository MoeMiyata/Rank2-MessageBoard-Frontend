import React, { useState } from 'react';
import { Dropbox } from 'dropbox'; // Dropbox SDKをインポート

export const DropboxUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const accessToken: string = 'sl.u.AFppm5Fg2bYKXvA5rTFtETY_XHGLc7WV464mi-nd3EKoq3JM95CHaTt-10V-n3F0hvSTH5JrX0wG0SJkgXRtFWvaYJzSq1pFbyiRcs4YQpfARCnkCqnNopZUGcrOp61trraAdhSlzVey-dpBz3Me-NAA5Ti5plYPV4ej6aX0EJ7noD8RKvoY6Qo5llShqjaMK-gyJxzUa9_1Gjuraj7vRIesAvM59RBhJuL8c3259vXxTCnAYweFXkoxBEn7Hx2FDKbv9lSAWg2EfQH9B3YfKpzK-Ug4vqe6Pw3q_AiV4qtl9lQnoQ-IQ77NjXxv2v7TpkiRFKlcfO8tVLUpzV8OSkeqPeldJDkUVaEG7gfWfCaYellDGaXJKDq9ebNo6OFe-l2PzVNmCD93eH1gGWJ-oNVXIvDrcx5O7ydRgU5xQo-oVTtlZ4iIFvNcfmAx7aFKgxW1gO5pkgl9Xu6qn1ruhC3WL8KBCrmkLTScPumTBqUDavVDp68p6XRsOj6QTokPmM3Fn9FOzjImt2rsHZwysL7XdUQmkWuzstRl2HzkTCjdfGWqKLrI8uXWD9srJ8QfG6-Ykuk2Zwq-dMvWs3EtdyTbtyWN2MxZuQ49kehc6JGmuptqRIC2w8cvJU-Xk0eIH6luNyJWHZP6QsQJLeIhMxZiMYludHHCSeYK8qFlq08xyaO52kbw7_hAZ69oYjaBCy3NjmbcCxQPDVnv_Bp57aeKMNzzGTTS9kL5MUlCYglHf6Iy23tgapMrZIgMyAkAvxE6EPrBZwY2ykjxiuZzmggbEuwu4UM9Tzoaw20vvQn-_hMp2d2eJ3bleVsRaTsxmNwGf5DiedVVAWvs8IOAq86PpGjSem87xQRNnrxQF42oIhyNYXDLEpleFA4pFmwbDTL5Xt_rsXoygZuehlBR8vI_WTXVxzUWwYN-tlWv9n0fEtDqFnyEf5EmA3c1sCm4KLFTrlo1J4-qkAFyh-2bPiZyVp7TKCdgAHyypiegcLPSU05HWce0fEKG3yDzP8ObBG7Ol8LEYuKnVQyP-pk4ONGDvrP5sWF0Gzpdm6yZExr_vQND_3r3vGod7YWbzVs4Z_1rfKEY51lqFona293lwNImUiBTXUlArSdntbQw5B3-pXqHzJEkeE8PWFoZ52oNYoNaZs4TCKkMahd8gM-tXlkiThIrKQPzGPGT7hYAgwIrqoxcbKUHkxl6-M5eeZyHroCpLXpoo5o_d7zeoM0FDASsdTjPQEmaQAH2n9Sf6bm27g5HOtFdATQV25PwI8RFdduTAUVnhXpPQKt6Vb-_fFGREXhQ1boghReNuGLvEkTvcc0nbz7AInzG554s4ZRwsavO32LeOXmM0IE4sDX4l1zoGeqCwgoso3nXf5UI4zp6csWoQPGSZkzGPJyciVRCjmYGWjUsinKdm-60_E39S5BJvLr2esLMVadIynpP9uo0zQ';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async (): Promise<void> => {
    console.log('In handleUpload');

    if (!image) return;

    const username = 'user1'

    setUploading(true);

    const dbx = new Dropbox({ accessToken });
    console.log(dbx);

    try {
      const response = await dbx.filesUpload({
        path: '/' + username + '_profileImage.jpg',
        contents: image,
      });

      console.log('response:', response);

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