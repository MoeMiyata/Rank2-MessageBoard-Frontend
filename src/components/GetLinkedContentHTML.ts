export const getLinkedContentHTML = (content: string): string => {
  const keywordLinks: Record<string, string> = {
    "量子コンピュータ": "https://ja.wikipedia.org/wiki/量子コンピュータ",
    "人工知能": "https://ja.wikipedia.org/wiki/人工知能",
    "機械学習": "https://ja.wikipedia.org/wiki/機械学習",
    // 追加したい語彙をここに
  };

  let html = content;
  for (const [keyword, url] of Object.entries(keywordLinks)) {
    const regex = new RegExp(`(${keyword})`, 'g');
    html = html.replace(
      regex,
      `<a href="${url}" target="_blank" class="auto-link">$1</a>`
    );
  }

  // 改行も考慮（<br>に置き換え）
  return html.replace(/\n/g, "<br>");
};
