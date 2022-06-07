import React from 'react';
import { AuthState } from './AuthState';
import AuthStore from './AuthStore';
import Action from '../Action';
export const AuthContext = React.createContext<AuthStore>({
    state: new AuthState(), 
    dispatch: (param : Action) => {}
});