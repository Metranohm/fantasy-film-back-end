import { Movie } from "../models/movie.js"

const create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.json(movie)
  } catch (error) {
    console.log(error)
  }
}

export {
  create,
}
