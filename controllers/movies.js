import { request } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { createCustomError } from '../errors/custom-errors.js';


import Movie from '../models/Movie.js';


export const getAllMovies = async (req, res) => {

    const { search, content} = req.query;
    
    

    //const queryObject = { }
    const queryObject = { createdBy: req.user.userId, };
   
    if (search) {
       
        queryObject.$or = [
          { title: { $regex: search, $options: 'i' } },
          { rating: { $regex: search, $options: 'i' } },
          
          // how to check for year which is not a string
          
        ];
      }

    if (content) {
        queryObject.category = { $regex: content, $options: 'i' };
      }  

  
    const movies = await Movie.find(queryObject);
    
    
    
   
    res.status(200).json({ movies });
  };


  
export const getMovie = async (req, res, next) => {
    
    const { id: movieID } = req.params
    const movie = await Movie.findOne({ _id: movieID })
   
    if (!movie) {
        return next(createCustomError(`No movie with the given id : ${movieID}`, 404))
    }
  
    res.status(200).json({ movie })
  }


  export const updateMovie = async (req, res, next) => {
    const { id: movieID } = req.params
  
    const movie = await Movie.findOneAndUpdate({ _id: movieID }, req.body, {
      new: true,
      runValidators: true,
    })
  
    if (!movie) {
      return next(createCustomError(`No movie with id : ${movieID}`, 404))
    }
  
    res.status(200).json({ movie })
  }
    