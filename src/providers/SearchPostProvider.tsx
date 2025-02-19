import React, { createContext, Dispatch, SetStateAction, useState } from "react";

export const SearchPostContext = createContext(
  {} as {
    kwd: string; // ページ番号を保持
    setKwd: Dispatch<SetStateAction<string>>;
  },
);

export const SearchPostProvider = (props: any) => {
    const { children } = props;
    const [kwd, setKwd] = useState<string>("");
    return (
      <SearchPostContext.Provider value={{ kwd, setKwd }}>
        {children}
      </SearchPostContext.Provider>
    );
  };