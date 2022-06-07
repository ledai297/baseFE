import { Dispatch } from "react";
import Action from "./Action";
import ContextState from "./ContextState";

interface ContextStore<T extends ContextState>{
    state: T,
    dispatch: Dispatch<Action>
}

export default ContextStore;