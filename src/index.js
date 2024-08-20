import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from "./context/ProductContext"
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1019934328018-g1lhomopi206afc01ia0j1jbhk8o9ttc.apps.googleusercontent.com">
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
