import { createContext, useContext, useReducer } from "react";
import { Reducer } from "../reducers/Reducer";
import { DataContextType, DataStateType, DataProviderProp } from "../types";

const DataContext = createContext<DataContextType>({} as DataContextType);

const initState: DataStateType = {
  answers: [],
};

const DataProvider = ({ children }: DataProviderProp) => {
  const [state, dispatch] = useReducer(Reducer, initState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("Data Context was not created");

  return context;
};

export { DataProvider, useData };
