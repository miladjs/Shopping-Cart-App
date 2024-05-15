import { createContext, useContext, useState, ReactNode } from "react";

type QueryProps = {
  search: string;
  category: string;
};

interface QueryContextProps {
  query: QueryProps | undefined;
  setQuery: React.Dispatch<React.SetStateAction<QueryProps | undefined>>;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<QueryProps>();

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return [context.query, context.setQuery] as const;
};

export { useQuery, QueryProvider };
