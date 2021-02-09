import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const UserContext = createStore(()=> {})
export const UserProvider = ({ children }) => {
  return (
    <Provider store={UserContext}>{children}</Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
