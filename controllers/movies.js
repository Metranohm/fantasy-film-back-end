import axios from "axios";
import { Movie } from "../models/movie.js"

const create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.json(movie)
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  try {
    const movies = await Movie.find({})
      .sort({ createdAt: 'desc' })
    res.status(200).json(movies)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('actors')
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err)
  }
}

const search = async (req,res) => {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_Key}&language=en-US&query=${req.body.movieSearch}&page=1&include_adult=false`)
  .then( response => {
    res.json(response.data.results)
  })
}

const credits = async (req,res) => {
  try {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.TMDB_API_Key}&language=en-US&page=1&include_adult=false`)
    .then( response => {
      console.log(response.data.cast)
      res.json(response.data.cast)
    })
    
  } catch (error) {
    console.log(error)
  }
}


export {
  create,
  index,
  show,
  search,
  credits
}
