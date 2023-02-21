import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkspaceContextProvider } from './context/WorkspaceContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkspaceContextProvider>
        <App />
      </WorkspaceContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)