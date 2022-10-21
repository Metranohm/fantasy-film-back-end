import mongoose from 'mongoose'

const Schema = mongoose.Schema

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    actors: { type: Schema.Types.ObjectId, ref: 'Actor' }
  },
  { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema)

export { Movie }