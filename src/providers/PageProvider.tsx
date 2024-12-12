import { createContext, Dispatch, SetStateAction } from "react";

export const PageContext = createContext(
  {} as {
    pageNumber: number; // ページ番号を保持
    setPageNumber: Dispatch<SetStateAction<number>>;
  },
);
