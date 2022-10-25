import axios from "axios";
import { Actor } from "../models/actor.js";
import { Profile } from "../models/profile.js";

const create = async (req, res) => {
  try {
    const actor = await Actor.findOne({'tmdbID': `${req.body.tmdbID}`})
    const profile = await Profile.findById(req.user.profile)
    if(actor){
      profile.favoriteActors.push(actor)
      profile.save()
      res.json(actor)
    }else{
      const actor = await Actor.create(req.body)
      profile.favoriteActors.push(actor)
      profile.save()
      res.json(actor)
    }
  } catch (error) {
    console.log(error)
  }
}

const index = async (req,res) => {
  try {
    const actors = await Actor.find({})
    res.status(200).json(actors)
  } catch (error) {
    console.log(error)
  }
}

const show = async (req,res) => {
  try {
    const actor = await Actor.findById(req.params.id)
      .populate('movies')
    res.status(200).json(actor)
  } catch (error) {
    console.log(error)
  }
}

const update = async (req,res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    ).populate('movies')
    res.status(200).json(actor)
  } catch (error) {
    console.log(error)
  }
}

const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id)
    res.status(200).json(actor)
  } catch (err) {
    res.status(500).json(err)
  }
}

const search = async (req,res) => {
  axios.get(`https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_Key}&language=en-US&query=${req.body.actorSearch}&page=1&include_adult=false`)
  .then( response => {
    res.json(response.data.results)
  })
}

export {
  create,
  index,
  show,
  update,
  search,
  deleteActor as delete,
  
}