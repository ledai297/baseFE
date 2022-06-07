import React from 'react';
import Action from '../Action';
import { PurchaseOrderState } from './PurchaseOrderState';
import PurchaseOrderStore from './PurchaseOrderStore';

export const PurchaseOrderContext = React.createContext<PurchaseOrderStore>({
    state: new PurchaseOrderState(), 
    dispatch: (param : Action) => {}
});