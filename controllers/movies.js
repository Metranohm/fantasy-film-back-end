import { Movie } from "../models/movie.js"

const create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  create,
}