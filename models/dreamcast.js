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

const dreamcastSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'Profile' },
    image: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    movie: {
      type: Schema.Types.ObjectId, ref: 'Movie' 
    },
    actor: {
      type:  Schema.Types.ObjectId, ref: 'Actor'
    },
    
  },
  { timestamps: true }
)

const Dreamcast = mongoose.model('Dreamcast', dreamcastSchema)

export { Dreamcast }