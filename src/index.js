import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={false}
      newestOnTop={true}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
