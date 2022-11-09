import React, { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { getAuthToken } from 'infra'

export default function PrivateRoute({ children, ...rest }: RouteProps): ReactElement {
    const authToken = getAuthToken()

    return <Route {...rest}>{authToken ? children : <Redirect to="/login" />}</Route>
}
