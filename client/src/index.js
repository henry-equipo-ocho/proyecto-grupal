import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './Components/Redux/Store';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import dotenv from 'dotenv';
// dotenv.config();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.credentials = 'include';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>

            <App />

        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();