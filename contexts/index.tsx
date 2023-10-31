import React, { ReactNode, createContext, useContext } from "react";
import { IShowInfo, IShowBackgroundImage } from "../types";
import { useState } from "react";

type ShowContextType = {
  showData: IShowInfo[] | null;
  setShowData: React.Dispatch<React.SetStateAction<IShowInfo[] | null>>;
  isShowDataLoading: boolean;
  setIsShowDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showBackgrounds: IShowBackgroundImage[] | [];
  setShowBackgrounds: React.Dispatch<React.SetStateAction<IShowBackgroundImage[] | []>>;
};

const ShowContext = createContext<ShowContextType | undefined>(undefined);

export const ShowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showData, setShowData] = useState<IShowInfo[] | null>(null);
  const [isShowDataLoading, setIsShowDataLoading] = useState<boolean>(false);
  const [showBackgrounds, setShowBackgrounds] = useState<IShowBackgroundImage[] | []>([]);

  return (
    <ShowContext.Provider
      value={{ showData, setShowData, isShowDataLoading, setIsShowDataLoading, showBackgrounds, setShowBackgrounds }}
    >
      {children}
    </ShowContext.Provider>
  );
};

export const useShowContext = (): [
  IShowInfo[] | null,
  React.Dispatch<React.SetStateAction<IShowInfo[] | null>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  IShowBackgroundImage[] | [],
  React.Dispatch<React.SetStateAction<IShowBackgroundImage[] | []>>
] => {
  const context = useContext(ShowContext);
  if (!context) {
    throw new Error("useShowContext must be used within a ShowProvider");
  }

  const { showData, setShowData, isShowDataLoading, setIsShowDataLoading, showBackgrounds, setShowBackgrounds  } =
    context;

  return [showData, setShowData, isShowDataLoading, setIsShowDataLoading, showBackgrounds, setShowBackgrounds];
};
