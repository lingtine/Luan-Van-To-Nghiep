import React, { FC, ReactElement, ComponentType, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface RequireAuthProps {
  WrappedComponent: ComponentType<any>; // Adjust the prop type based on your component props
}

const RequireAuth: FC<RequireAuthProps> = ({ WrappedComponent }: RequireAuthProps): ReactElement => {
  const [auth, setAuth] = useState<boolean>()
  // You can add any additional logic or state management here
  const token = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  useEffect(() => {
    if(token && token !== "") {
      setAuth(true)
    } 
  },[refreshToken, token])
  
  // Return the wrapped component with any additional logic
  return <WrappedComponent isAuthenticated={auth}/>;
};

export default RequireAuth;
