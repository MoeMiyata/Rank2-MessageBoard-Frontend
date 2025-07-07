import React, { createContext, Dispatch, SetStateAction, useState } from "react";

// ポストを保持する型を定義
export type KeywordsLinksType = {
  keyword: string;
  url: string;
};

export const KeywordsLinksContext = createContext(
  {} as {
    keywordLinks: KeywordsLinksType[]; // ポストの配列を保持
    setKeywordLinks: Dispatch<SetStateAction<KeywordsLinksType[]>>;
  },
);

export const KeywordsLinksProvider = (props: any) => {
  const { children } = props;
  const [keywordLinks, setKeywordLinks] = useState<KeywordsLinksType[]>([]);
  return (
    <KeywordsLinksContext.Provider value={{ keywordLinks, setKeywordLinks }}>
      {children}
    </KeywordsLinksContext.Provider>
  );
};