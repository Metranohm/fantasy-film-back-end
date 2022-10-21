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

export {
  create,
  index,
}
