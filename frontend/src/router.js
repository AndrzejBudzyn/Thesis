import React from "react";
import { createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home"; 
import UserPanel from "./pages/UserPanel"; 
import AdminPanel from "./pages/AdminPanel"; 
import App from "./pages/App"; 
import AuthForm from "./pages/AuthForm"; 
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import RecipePage from './pages/RecipePage';


const router =createBrowserRouter([
    {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <App />,
      },
      {
        path: '/recipe/:id/:recipeName',
        element: <RecipePage />,
      },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
          {
            path: '/profile',
            element: <UserPanel />,
          },
          {
            path: '/admin',
            element: <AdminPanel/>,
          },
        ],
      },
      {
        path: '/',
        element: <GuestLayout />,
        children: [

          {
            path: '/auth',
            element: <AuthForm />,
          }
        ],
      }
])
    

export default router;