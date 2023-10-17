import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HomeLayout, Landing, Register, Login, DashboardLayout,Error, AddJob, Stats, Profile, AllJobs,Admin, EditJob} from './pages';
import {action as registerAction} from '../src/pages/Register';
import {action as loginAction} from '../src/pages/Login';
import {action as createJobAction} from '../src/pages/AddJob';
import {action as editJobAction} from '../src/pages/EditJob';
import {loader as dashboardLoader} from '../src/pages/DashboardLayout';
import {loader as allJobsLoader} from '../src/pages/AllJobs';
import {loader as editJobLoader} from '../src/pages/EditJob';
import {loader as adminLoader} from '../src/pages/Admin';
import {action as deleteJobAction} from '../src/pages/DeleteJob';
import {action as profileAction} from '../src/pages/Profile';
import {loader as statsLoader} from '../src/pages/Stats';
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}
checkDefaultTheme();

const router = createBrowserRouter([
  { // an array that contains all routes
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // default child that will be displayed when we go to '/'
        element: <Landing />
      },
      { 
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      { 
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      { 
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader
          }
        ]
      }
    ]
  },
  
]);

const App = () => {
  return <RouterProvider router={router} />
}

export default App
