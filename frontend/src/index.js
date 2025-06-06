import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
  
    <Routes>
      
      <Route path="*" element={<App/>}/>
    </Routes>
       
    </BrowserRouter>
  
  </Provider>
);
