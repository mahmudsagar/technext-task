import React from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext, useGlobalContext } from '../../../Context/Context'

const PrivateRoute = ({children, ...rest}) => {
    const {isLoggedIn} = useGlobalContext(AuthContext)

    return (
        <Route
        {...rest}
        render={({ location }) =>
          (isLoggedIn) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
}

export default PrivateRoute
