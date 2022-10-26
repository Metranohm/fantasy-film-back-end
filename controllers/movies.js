import axios from "axios";
import { Movie } from "../models/movie.js"
import { Profile } from "../models/profile.js";

const create = async (req, res) => {
  try {
    const movie = await Movie.findOne({'tmdbID': `${req.body.tmdbID}`})
    const profile = await Profile.findById(req.user.profile)
    if(movie){
      profile.favoriteMovies.push(movie)
      profile.save()
      res.json(movie)
    }else{
      const newMovie = await 
      Movie.create(req.body)
      console.log(newMovie)
      profile.favoriteMovies.push(newMovie)
      profile.save()
      res.json(newMovie)
    }
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  try {
    const movies = await Movie.find({})
    res.status(200).json(movies)
  } catch (err) {
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('cast.actors')
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

const favorite = async (req,res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    .populate('favoriteMovies')
    const isFavMovie = profile.favoriteMovies.some(el => el.tmdbID === parseInt(req.body.tmdbID))
    res.json(isFavMovie)
  } catch (error) {
    console.log(error)
  }
  }

const credits = async (req,res) => {
  try {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.TMDB_API_Key}&language=en-US&page=1&include_adult=false`)
    .then( response => {
      res.json(response.data.cast)
    })
    
  } catch (error) {
    console.log(error)
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteFavorite = async (req,res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
    .populate('favoriteMovies')
    const remainingMovies = profile.favoriteMovies.filter(movies => movies.tmdbID !== parseInt(req.body.tmdbID))
    profile.favoriteMovies = remainingMovies
    profile.save()
    res.json({msg: 'ok'})
  } catch (error) {
    console.log(error)
  }
}

const update = async (req,res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    ).populate('actors')
    res.status(200).json(movie)
  } catch (error) {
    console.log(error)
  }
}

export {
  create,
  index,
  show,
  search,
  credits,
  deleteMovie as delete,
  update,
  favorite,
  deleteFavorite
}
