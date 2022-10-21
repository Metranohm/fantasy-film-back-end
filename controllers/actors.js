import { Actor } from "../models/actor.js";

const create = async (req, res) => {
  try {
    const actor = await Actor.create(req.body)
    res.json(actor)
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
export {
  create,
  index,
  show,
  update,
}