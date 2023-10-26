import { request } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { createCustomError } from '../errors/custom-errors.js';
import Movie from '../models/Movie.js';


export const getAllMovies = async (req, res) => {

    /* search is the keyword typed by the user in the searchbar
     content is either movies, tv-shows */
    const { search, content} = req.query;
    const queryObject = { createdBy: req.user.userId, };
   
    if (search) {
        queryObject.$or = [
          { title: { $regex: search, $options: 'i' } },
          { rating: { $regex: search, $options: 'i' } },
          ];
      }

    if (content) {
        queryObject.category = { $regex: content, $options: 'i' };
      }  

    const movies = await Movie.find(queryObject);
    res.status(200).json({ movies });
  };


  
export const getMovie = async (req, res, next) => {
    
    // request parameter is the movie id present in the url of the rquest
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
    