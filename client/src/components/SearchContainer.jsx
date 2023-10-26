import { Form, useSubmit, Link } from 'react-router-dom';
import FormRow from './FormRow';
import React, { useContext } from 'react';
import { useAllmoviesContext } from '../pages/home';
import { useJustmoviesContext } from '../pages/movies';
import { useJustseriesContext } from '../pages/series';
import { useJustbookmarkContext } from '../pages/bookmark';



const SearchContainer = () =>{

    
    // react hook used to enable controlled search input
    const submit = useSubmit();
   
    // at any given time only one of the contexts is defined
    
    if(useAllmoviesContext() != undefined){
        
        const { data, searchValues } = useAllmoviesContext();
        const {search} = searchValues;
        
        return (
            <>
            <div className='form-holder'>
                <div className='search-icon-container'>  <img src="./assets/icon-search.svg" alt="search" /></div>
                 <Form>
                    <FormRow  type='search' name='search' value={search}
                    placeholder="search movie, tv show" onChange= {(e)=>{submit(e.currentTarget.form)}} />
                </Form>
    
            </div>
            </>
        );
    }
    
    if(useJustmoviesContext() != undefined){
        
        const { data, searchValues } = useJustmoviesContext();
        const {search} = searchValues;
        
        return (
            <>
            <div className='form-holder'>
                <div className='search-icon-container'>  <img src="./assets/icon-search.svg" alt="search" /></div>
                 <Form>
                    <FormRow  type='search' name='search' value={search}
                    placeholder="search movie, tv show" onChange= {(e)=>{submit(e.currentTarget.form)}} />
                </Form>
    
            </div>
            </>
        );
    }

    if(useJustseriesContext() != undefined){
        
        const { data, searchValues } = useJustseriesContext();
        const {search} = searchValues;
        
        return (
            <>
            <div className='form-holder'>
                <div className='search-icon-container'>  <img src="./assets/icon-search.svg" alt="search" /></div>
                 <Form>
                    <FormRow  type='search' name='search' value={search}
                    placeholder="search movie, tv show" onChange= {(e)=>{submit(e.currentTarget.form)}} />
                </Form>
    
            </div>
            </>
        );
    }

    if(useJustbookmarkContext() != undefined){
        
        const { data, searchValues } = useJustbookmarkContext();
        const {search} = searchValues;
        
        return (
            <>
            <div className='form-holder'>
                <div className='search-icon-container'>  <img src="./assets/icon-search.svg" alt="search" /></div>
                 <Form>
                    <FormRow  type='search' name='search' value={search}
                    placeholder="search movie, tv show" onChange= {(e)=>{submit(e.currentTarget.form)}} />
                </Form>
    
            </div>
            </>
        );
    }
    

   
  



}

export default SearchContainer;