import { KeywordsLinksType } from "../providers/KeywordLinksProvider.tsx";

export const getLinkedContentHTML = (content: string, keywordLinks: KeywordsLinksType[]): string => {
  let html = content;

  for (const { keyword, url } of keywordLinks) {
    const isEnglish = /^[A-Za-z\s]+$/.test(keyword);  // 英字のみなら true
    const regex = new RegExp(`(${keyword})`, isEnglish ? 'gi' : 'g');
    html = html.replace(
      regex,
      `<a href="${url}" target="_blank" class="auto-link">$1</a>`
    );
  }

  // 改行も考慮（<br>に置き換え）
  return html.replace(/\n/g, "<br>");
};
