import React, { createContext, Dispatch, SetStateAction, useState } from "react";

export const VolumeContext = createContext(
  {} as {
    isMute: boolean; // ミュートか否か
    setIsMute: Dispatch<SetStateAction<boolean>>;
  },
);

export const VolumeProvider = (props: any) => {
    const { children } = props;
    const [ isMute, setIsMute ] = useState<boolean>(false);
    return (
      <VolumeContext.Provider value={{ isMute, setIsMute }}>
        {children}
      </VolumeContext.Provider>
    );
  };