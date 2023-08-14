import React from 'react';

type userDataType={
    fName:string;
    lName:string;
    Mobile:string;
    email:string
    password:string
  }

const UserEmailContext = React.createContext<userDataType | undefined >(undefined);

export default UserEmailContext;