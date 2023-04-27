import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContextProvider } from './features/Toast/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import { FormContextProvider } from './Contexts/formContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <FormContextProvider>
      <ToastContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToastContextProvider>
    </FormContextProvider>
  </BrowserRouter>
);
