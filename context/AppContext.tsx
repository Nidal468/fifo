'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';

interface AppState {
  isLoading: boolean;
  _loaded: number;
}

interface AppContextType {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  updateAppState: (key: keyof AppState | Partial<AppState>, value?: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    _loaded: Date.now(),
  });

  const updateAppState = (key: keyof AppState | Partial<AppState>, value: boolean = false) => {
    if (typeof key === 'object') {
      setAppState((prevState) => ({
        ...prevState,
        ...key,
      }));
    } else {
      setAppState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const contextValue: AppContextType = {
    appState,
    setAppState,
    updateAppState,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
