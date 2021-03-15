import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { Loading } from '../components';


const PrivateRoute = ({children, ...rest}) => {
  const {isAuthenticated, isLoading} = useAuth0()
  try {
  
    if (isLoading){
      return <Loading/>
    } else {
      return (
        <Route {...rest} render={() => isAuthenticated ? children : <Redirect to ="/"/>}></Route>
      );
    }
    
  } catch {
  return <Route><Redirect to ="/"/></Route>
  }
};
export default PrivateRoute;
