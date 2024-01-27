import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './app/store.js'
import { Provider } from 'react-redux'


import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.jsx';
import Home from './Pages/Home.jsx';
import Login from "./Pages/Login.jsx";
import Workouts from './Pages/workouts.jsx';
import Signup from './Pages/Signup.jsx';
import BMICalculator from './Pages/Bmi.jsx';
import Records from './Pages/Records.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[{
      path:"/",
      element:<Home/>
    },
   {
    path:"login",
    element:<Login/>
   },
   {
    path:"workouts",
    element:<Workouts/>
   },
   {
    path:"signup",
    element:<Signup/>
   },
   {
    path:"bmi",
    element:<BMICalculator/>
   },
   {
    path:"records",
    element:<Records/>
   }
  

]
    
    
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  
  </React.StrictMode>,
)
