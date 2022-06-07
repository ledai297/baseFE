import React, { ReactNode, useReducer } from "react";
import { PurchaseOrderContext } from "./PurchaseOrderContext";
import purchaseOrderReducer from "./PurchaseOrderReducer";
import { PurchaseOrderState } from "./PurchaseOrderState";

type AuthProviderType = ({
    children,
}: {
    children: ReactNode;
}) => JSX.Element;

const PurchaseOrderProvider: AuthProviderType = ({children}) => {
    const initialState = new PurchaseOrderState();
    const [state, dispatch] = useReducer(purchaseOrderReducer, initialState)
    return (
        <PurchaseOrderContext.Provider value={{state, dispatch}}>
            {children}
        </PurchaseOrderContext.Provider>
    );
};

export default PurchaseOrderProvider;