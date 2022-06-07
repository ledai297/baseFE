import { AuthState } from "./AuthState";
import ContextStore from "../ContextStore";


interface AuthStore extends ContextStore<AuthState>{

}
export default AuthStore;