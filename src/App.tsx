import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
// import AuthProvider from './contexts/AuthenticateContext';
import AuthProvider from './contexts/auth/AuthProvider';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Router, BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { SnackbarProvider } from 'notistack';
import PurchaseOrderProvider from './contexts/purchaseOrder/PurchaseOrderProvider';

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
    <>
      <AuthProvider navigate={browserHistory.push}>
          <PurchaseOrderProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={5} hideIconVariant={true}>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </PurchaseOrderProvider>
        
      </AuthProvider>
    </>
  );
}

export default App;