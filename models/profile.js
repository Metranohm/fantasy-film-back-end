import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  dreamCast: [{type: Schema.Types.ObjectId, ref: 'Dreamcast'}],
  favoriteActors: [{type: Schema.Types.ObjectId, ref: 'Actor'}], 
  favoriteMovies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
