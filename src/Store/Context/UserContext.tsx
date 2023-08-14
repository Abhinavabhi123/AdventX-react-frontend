import React from 'react';

type userDataType={
   id:string
  }

const UserIdContext = React.createContext<userDataType | undefined >(undefined);

export default UserIdContext;