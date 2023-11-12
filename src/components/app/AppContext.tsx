// AppContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { Character } from '../../types/character';
import { useSearchParams } from 'react-router-dom';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextValue {
  request: string;
  setRequest: Dispatch<SetStateAction<string>>;
  results: Array<Character> | null;
  setResults: Dispatch<SetStateAction<Array<Character> | null>>;
  quantityResults: number;
  setQuantityResults: Dispatch<SetStateAction<number>>;
  qtyPerPage: number;
  setQtyPerPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  character: Character | null;
  setCharacter: Dispatch<SetStateAction<Character | null>>;
  isColumn: boolean;
  setIsColumn: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>; 
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const [request, setRequest] = useState<string>(
    localStorage.getItem('request') || ''
  );
  const [results, setResults] = useState<Array<Character> | null>(null);
  const [quantityResults, setQuantityResults] = useState<number>(0);
  const [qtyPerPage, setQtyPerPage] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isColumn, setIsColumn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState<string>(localStorage.getItem('request') || '');

  const contextValue: AppContextValue = {
    request,
    setRequest,
    results,
    setResults,
    quantityResults,
    setQuantityResults,
    qtyPerPage,
    setQtyPerPage,
    loading,
    setLoading,
    error,
    setError,
    searchParams,
    setSearchParams,
    character,
    setCharacter,
    isColumn,
    setIsColumn,
    currentPage,
    setCurrentPage,
    input,
    setInput
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
