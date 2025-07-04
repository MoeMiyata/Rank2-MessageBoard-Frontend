// src/api/extractKeywords.ts
import axios from 'axios';
import { hostUrl } from './hostUrl.ts';

export const extractKeywords = async (content: string): Promise<string[]> => {
  try {
    const response = await axios.post(`${hostUrl}/post/extract-keywords`, { content });
    console.log(response.data)
    return response.data; // ["keyword1", "keyword2", ...]
  } catch (err) {
    console.error('キーワード抽出失敗:', err);
    return [];
  }
};
