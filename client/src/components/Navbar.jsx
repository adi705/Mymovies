import { useState } from 'react'
import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


function Navbar() {
  
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
         
          const { data } = await customFetch.get('/auth/logout');
          toast.success('Logout successful');
          return navigate('/');
    
        
        } catch (error) {
         
         toast.error(error?.response?.data?.msg);
         return error;
        }
      };
  

  return (
    <> 

      <div className='navbar-container'>
       
        <img src="assets/logo.svg" className='logo' alt="home-icon" />
      
        <div className='nav-icons'>
            <Link to="/home"><img className='spes' src="assets/icon-nav-home.svg" alt="movies icon" /></Link>
            <Link to="/movies"><img className='spes' src="assets/icon-nav-movies.svg" alt="movies icon" /></Link>
            <Link to="/series"><img className='spes' src="assets/icon-nav-tv-series.svg" alt="movies icon" /></Link>
            <Link to="/bookmark"><img className='spes' src="assets/icon-nav-bookmark.svg" alt="movies icon" /></Link>
         </div>

        <button className='logout-button btn' onClick={handleLogout}>Logout</button>
      
      </div>
     
      
      
    </>
  )
}

export default Navbar
