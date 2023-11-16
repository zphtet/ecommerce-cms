"use client";
import { createContext, useContext, useState } from "react";
type ContextType = {
  deleteId: string | null;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
};
const DeleteContext = createContext<ContextType>({
  deleteId: null,
  setDeleteId: () => {},
});

export const DeleteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  return (
    <DeleteContext.Provider value={{ deleteId, setDeleteId }}>
      {children};
    </DeleteContext.Provider>
  );
};

export const useDeleteContext = () => {
  const value = useContext(DeleteContext);
  if (!value) {
    throw new Error("Context muse be used under Context Provider");
  }
  return value;
};
