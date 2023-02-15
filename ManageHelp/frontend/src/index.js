import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkspaceContextProvider } from './context/WorkspaceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkspaceContextProvider>
      <App />
    </WorkspaceContextProvider>
  </React.StrictMode>
)