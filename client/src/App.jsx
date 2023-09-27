import { useState } from 'react'
import Navbar from './components/Navbar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Movies from './pages/movies';
import { loader as justmovieLoader } from './pages/movies';
import Login from './pages/Login';

import { loader as movieLoader } from './pages/home';
import { action as loginAction } from './pages/Login';

import Register from './pages/Register';
import { action as RegisterAction } from './pages/Register';

import Series from './pages/series';
import { loader as justseriesLoader } from './pages/series';

import Bookmark from './pages/bookmark';
import { loader as justbookmarkLoader } from './pages/bookmark';




const router = createBrowserRouter([

  {
    path: '/',
    element: <Login/>,
    action: loginAction,
  },

  {
    path: '/register',
    element: <Register/>,
    action: RegisterAction,
  },


  {
    path: '/home',
    element: <Home/>,
    loader: movieLoader,
  },

  {
    path: '/movies',
    element: <Movies/>,
    loader: justmovieLoader,
  },

  {
    path: '/series',
    element: <Series/>,
    loader: justseriesLoader,
  },

  {
    path: '/bookmark',
    element: <Bookmark/>,
    loader: justbookmarkLoader,
  },





  

  
 ]);

const App = () => {
  return <RouterProvider router={router}/>;
};
export default App;




/*function App() {
  

  return (
    <> 

     
       
       <h1>yo yo yoy</h1>
      
    
     
     
      
    </>
  )
}

export default App*/
