import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    rating: { type: Number, min: 1, max: 10, default: 10},
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const castSchema = new Schema(
  {
    character: {
      type: String
    },
    actor: { type: Schema.Types.ObjectId, ref: 'Actor' }
  }
)

const dreamcastSchema = new Schema(
  {
    name: {
      type: String,
      
    },
    image: {
      type: String,
    },
    tmdbID : Number,
    cast: [castSchema],
    comments: [commentSchema]
  },
  { timestamps: true }
)

const Dreamcast = mongoose.model('Dreamcast', dreamcastSchema)

export { Dreamcast }