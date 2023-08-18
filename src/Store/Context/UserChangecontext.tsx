import  { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface ValueType {
  userChanges: boolean;
  setUserChanges: Dispatch<SetStateAction<boolean>>;
}

const ChangeContext = createContext<ValueType>({
  userChanges: false,
  // ! don't remove the commented code  in this page it will cause type error
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserChanges: () => {} 
});

function UserChangeContext({ children }: { children: ReactNode }) {
  const [userChanges, setUserChanges] = useState(false);

  return (
    <ChangeContext.Provider value={{ userChanges, setUserChanges }}>
      {children}
    </ChangeContext.Provider>
  );
}

export default UserChangeContext;
