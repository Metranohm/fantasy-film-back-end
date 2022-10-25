import mongoose from 'mongoose'

const Schema = mongoose.Schema

const actorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  tmdbID : Number,
},{
  timestamps: true,
})

const Actor = mongoose.model('Actor', actorSchema)

export { Actor }
