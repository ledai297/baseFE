import React, {ReactNode, useState, useEffect, useReducer} from "react";
import { AuthState } from "./AuthState";
import { AuthenticatedUser } from "./AuthenticatedUser";
import accountService from "../../services/account/accountService";
import { tokenStorage } from "../../utilities/tokenStorage";
import authReducer from "./AuthReducer";
import { authActions } from "./AuthActions";
import { AuthContext } from "./AuthContext";

type AuthProviderType = ({
    children,
    navigate
}: {
    children: ReactNode;
    navigate: (path: string) => void;
}) => JSX.Element;

const AuthProvider: AuthProviderType = ({children, navigate}) => {
    // defaultContextState.updateUser = (user) => {
    //     setState({...state, user: user, isAuthenticated: user instanceof AuthenticatedUser})
    // }

    // const getCurrentAccount = () => {
    //     if (tokenStorage.getToken() !== '') {
    //         accountService.getCurrentAccount()
    //             .then(
    //                 account => {
    //                     let authenticatedUser = new AuthenticatedUser(account);
    //                     setState({...state, user: authenticatedUser, isAuthenticated: account instanceof AuthenticatedUser});
    //                 }
    //             )
    //     }
    // }
    // defaultContextState.getCurrentAccount = () => {
    //     getCurrentAccount();
    // }

    // defaultContextState.logout = () => {
    //     setState({...state, user: {}});
    //     tokenStorage.clearToken();
    //     window.location.reload()
    // }

    // const [state, setState] = useState(defaultContextState);
    // useEffect(() => {
    //     getCurrentAccount();
    // }, [])

    const initialState = new AuthState();
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        if (tokenStorage.getToken() === ''){
            return;
        }
        accountService.getCurrentAccount()
                .then(
                    account => {
                        const authenticatedUser = new AuthenticatedUser(account);
                        dispatch({type: authActions.UPDATE_USER, payload: authenticatedUser});
                        dispatch({type: authActions.UPDATE_AUTHENTICATED, payload: true})                        
                    }
                )
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;