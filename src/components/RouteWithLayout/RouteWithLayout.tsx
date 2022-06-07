import React, {useContext, useState} from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import {tokenStorage} from "../../utilities/tokenStorage";
import { AuthContext } from '../../contexts/auth/AuthContext';

export interface Props extends RouteProps {
  component: any,
  layout: any,
  path: string,
  exact?: boolean,
  authenticate?: boolean,
}

const RouteWithLayout: React.FC<Props> = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;
    const {state} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={matchProps => {
                let authenticate = state.isAuthenticated;
                return (
                    // (authenticate || props.path === '/admin/sign-in') || (!authenticate && tokenStorage.canRefreshToken()) ?
                        (<Layout>
                            <Component {...matchProps} />
                        </Layout>)
                        // :
                        // <Redirect to='/admin/sign-in' />
                );
            }}
        />
    );
};

export default RouteWithLayout;