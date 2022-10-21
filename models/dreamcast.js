import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    review: {
      type: String,
      required: true
    },
    rating: { type: Number, min: 1, max: 10, default: 10},
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const dreamcastSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: 'Profile' },
    image: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    movie: {
      type: { type: Schema.Types.ObjectId, ref: 'Movie' },
      required: true,
    },
    actor: {
      type: { type: Schema.Types.ObjectId, ref: 'Actor' },
      required: true,
    },
    
  },
  { timestamps: true }
)

const Dreamcast = mongoose.model('Dreamcast', dreamcastSchema)

export { Dreamcast }