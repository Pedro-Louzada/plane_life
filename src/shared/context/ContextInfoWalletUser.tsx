import {ReactNode, createContext, useContext, useState} from 'react';
import IInfoWalletUser from '../interfaces/IInfoWalletUser';
import React from 'react';

interface IInfoWalletUserContextProviderProps {
  children: ReactNode;
}

export interface IInfoWalletUserContextProviderValues {
  infoWalletUser: IInfoWalletUser[];
  setInfoWalletUser: (state: IInfoWalletUser) => void;
}

const ContextInfoWalletUser = createContext({});

export function InfoWalletUserContextProvider({
  children,
}: IInfoWalletUserContextProviderProps) {
  const [infoWalletUser, setInfoWalletUser] = useState<IInfoWalletUser[]>([]);

  return (
    <ContextInfoWalletUser.Provider value={{infoWalletUser, setInfoWalletUser}}>
      {children}
    </ContextInfoWalletUser.Provider>
  );
}

export function useInfoWalletUser() {
  return useContext(
    ContextInfoWalletUser,
  ) as IInfoWalletUserContextProviderValues;
}
