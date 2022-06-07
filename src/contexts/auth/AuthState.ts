import { AuthenticatedUser } from "./AuthenticatedUser";
import ContextState from "../ContextState";

export class AuthState implements ContextState {
    constructor(){
        this.user = {};
        this.isAuthenticated = false;
        
    }
    user: AuthenticatedUser | {};
    isAuthenticated: boolean;
    // updateUser: ({}) => void;
    // getCurrentAccount: () => void;
    // logout: () => void
};