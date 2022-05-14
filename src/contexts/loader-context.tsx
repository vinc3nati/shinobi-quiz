import { createContext, useContext, useState } from "react";
import { LayoutPropType, LoaderContextType } from "../types";

const LoaderContext = createContext<LoaderContextType>({
  showLoader: false,
} as LoaderContextType);

const LoaderProvider = ({ children }: LayoutPropType) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) throw new Error("Loader Context was not created");

  return context;
};

export { LoaderProvider, useLoader };
