import React, { createContext, Dispatch, SetStateAction, useState } from "react";

export const PageLinkContext = createContext(
  {} as {
    pageNumber: number; // ページ番号を保持
    setPageNumber: Dispatch<SetStateAction<number>>;
  },
);

export const PageLinkProvider = (props: any) => {
    const { children } = props;
    const [pageNumber, setPageNumber] = useState<number>(0);
    return (
      <PageLinkContext.Provider value={{ pageNumber, setPageNumber }}>
        {children}
      </PageLinkContext.Provider>
    );
  };