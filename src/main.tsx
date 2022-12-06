import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import './styles/global.css'

import {AppRoutes} from './routes/AppRoutes'
import { Home } from './pages/Home';

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
]);
 */


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
