import React, { ReactElement } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Board from 'domains/board/pages/Board'
import Login from 'domains/authentication/pages/Login'
import ForgotPassword from 'domains/authentication/pages/ForgotPassword'
import PrivateRoute from 'components/PrivateRoute'
import { Insight } from 'domains/insight/pages'
import VerifyCode from 'domains/authentication/pages/VerifyCode'
import NotFound from './pages/NotFound/NotFound'

function Routes(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route path="/verify-code">
                    <VerifyCode />
                </Route>
                <PrivateRoute path="/board">
                    <Board />
                </PrivateRoute>
                <PrivateRoute path="/insights">
                    <Insight />
                </PrivateRoute>
                <Route path="/not-found">
                    <NotFound />
                </Route>
                <Redirect from="/" exact to="/board" />
                <Redirect from="*" to="/not-found" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
