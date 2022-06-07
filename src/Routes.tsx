import React from 'react';
// import { useAuth } from './contexts/AuthenticateContext';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import { MainLayout, SigninLayout } from './layouts';
import SignIn from './pages/SignIn';
import SellerList from './pages/seller/list/SellerList';
import SellerDetail from './pages/seller/detail/SellerDetail';

const Routes: React.FC = () => {
    return (
        <Switch>
            <RouteWithLayout
                component={SignIn}
                exact
                layout={SigninLayout}
                path="/admin/sign-in"
            />

            <RouteWithLayout
                component={SellerDetail}
                layout={MainLayout}
                path="/admin/sellers/:id"
            />

            <RouteWithLayout
                component={SellerList}
                layout={MainLayout}
                path="/admin/sellers"
            />
        </Switch>
    )
}

export default Routes;