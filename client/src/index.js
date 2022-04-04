import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//antd css
import 'antd/dist/antd.css';

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import  Reducer  from './_reducers';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')//index.html 의 div에 APP컴포넌트 넣어서 보여줌
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={createStoreWithMiddleware(Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
     
    <App />

  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
