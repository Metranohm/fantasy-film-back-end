import { Actor } from "../models/actor.js";

const create = async (req, res) => {
  try {
    const actor = await Actor.create(req.body)
    res.json(actor)
  } catch (error) {
    console.log(error)
  }
}

export {
  create,
  
}