import mongoose from 'mongoose'

const Schema = mongoose.Schema

const castSchema = new Schema(
  {
    character: {
      type: String
    },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
  }
)

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    tmdbID : Number,
    cast: [castSchema],
  },
  { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema)

export { Movie }