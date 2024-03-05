import {ReactNode, createContext, useContext, useState} from 'react';
import IDataUser from '../interfaces/IDataUser';
import React from 'react';

interface IDataUserContextProviderProps {
  children: ReactNode;
}

export interface IDataUserContextProviderValues {
  dataUser: IDataUser;
  setDataUser: (state: IDataUser) => void;
}

const ContextDataUser = createContext({});

export function DataUserContextProvider({
  children,
}: IDataUserContextProviderProps) {
  const [dataUser, setDataUser] = useState<IDataUser | null>(null);

  return (
    <ContextDataUser.Provider value={{dataUser, setDataUser}}>
      {children}
    </ContextDataUser.Provider>
  );
}

export function useDataUser() {
  return useContext(ContextDataUser) as IDataUserContextProviderValues;
}
