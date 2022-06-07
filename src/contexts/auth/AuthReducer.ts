import { Reducer } from "react";
import Action from "../Action";
import _ from 'lodash';
import { AuthState } from "./AuthState";
import { authActions } from "./AuthActions";
import { AuthenticatedUser } from "./AuthenticatedUser";
import { tokenStorage } from "../../utilities/tokenStorage";

const authReducer : Reducer<AuthState, Action> = (state: AuthState, action: Action) => {
    console.log("dispatch");
    const newState = _.cloneDeep(state);
    switch(action.type){
        case authActions.LOGOUT: {
            tokenStorage.clearToken();
            window.location.reload()
            break;
        }
        case authActions.UPDATE_USER: {
            newState.user = action.payload as AuthenticatedUser;
            break;
        }
        case authActions.UPDATE_AUTHENTICATED: {
            newState.isAuthenticated = action.payload as boolean;
            break;
        }
        default:
            break;
        
    }

    

    return newState;
}

export default authReducer;