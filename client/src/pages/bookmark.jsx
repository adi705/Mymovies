import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useLoaderData, useParams, Form, Link } from 'react-router-dom';
import { useContext, createContext } from 'react';
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import SearchContainer from '../components/SearchContainer';
import { useNavigate } from 'react-router-dom';


export const loader = async ({ request }) => {

    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);

      try {
        const { data } = await customFetch.get('/movies', {
          params,
        });
       
       if(Object.keys(params).length == 0){
          params.search = "";
        }
       
        const searchValues = {...params};
        return {data, searchValues};
       
      } catch (error) {
       
        toast.error(error?.response?.data?.msg);
        return error;
      }  

   
};


const JustbookmarkContext = createContext();


const Bookmark = () => {

    const {data, searchValues} = useLoaderData();
    const movies = data.movies.filter(item => item.isBookmarked === true);

 
    const navigate = useNavigate();
    const changeState = async (id) => {
        // Get the current URL including query parameters
        const currentUrl = window.location.href;
       try {
          
          const {_id} = id;
          const {data} =  await customFetch.get(`/movies/${_id}`);
          const newbookmark = !data.movie.isBookmarked;
          const  newdata  = await customFetch.patch(`/movies/${_id}`,{
            isBookmarked: newbookmark,
             
            });

          // Reload the page with the same URL
          navigate(window.location.pathname + window.location.search);
      
          
      } catch (error) {
        toast.error(error?.response?.data?.msg);
          return error;
          
        }
      }    
    

return (
    <>
    <Navbar/>
    <JustbookmarkContext.Provider value={{data, searchValues}}>
    <div className='info-text'>
      <SearchContainer/>
      {movies.length > 0 && <> <h1 className='title'>Bookmarked</h1> </>}
      {movies.length == 0 && <> <h1 className='title'>Oops no such content exists!</h1>   </>}
    </div>

    <div className='movie-canvas'>
    
    { movies.map((movie) =>{
        const {_id,title,year,category,rating, isBookmarked} = movie;
        return (
          <article key={_id} >

            <div className='moviecontainer'>

             <div className='thumbnail-container'>
               <img className='thumbnail-image'  src={movie.thumbnail.regular.large} alt="oops no image" />
               <img className='thumbnail-image play'  src="./assets/icon-play.svg" alt="oops no image" />
               <button className='bookmark-container'  onClick={()=>changeState({_id})} >
                    {isBookmarked ?  <img src="./assets/icon-bookmark-full.svg" alt="empty bookmark" /> :  <img src="./assets/icon-bookmark-empty.svg" alt="empty bookmark" />}
               </button>
              </div>
               
             

              <div className='movie-info'> 
                <div className='sec-info'>  
                   <ul>
                    <li>{year}</li>
                    <li>{category}</li>
                    <li>{rating}</li>
                   </ul>
                 
                </div> 
                <div className='primary-info'>
                    <h4>{title}</h4>
                </div>
              </div>

             
            </div>
          </article>
        );
    }) }
  
   </div> 
   </JustbookmarkContext.Provider>
   </>
  );
};


export const useJustbookmarkContext = () => useContext(JustbookmarkContext);

export default Bookmark;
