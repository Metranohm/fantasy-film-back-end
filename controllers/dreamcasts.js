import { Profile } from "../models/profile.js"
import { Dreamcast } from "../models/dreamcast.js"
import { Actor } from "../models/actor.js"

const create = async (req, res) => {
  try {
    let cast = []
    const profile = await Profile.findById(req.user.profile)
    const dreamcast = await Dreamcast.create({})
    for (let idx = 0; idx < req.body.cast.length; idx++ ) {
      const foundActor = await Actor.findOne({'tmdbID': `${req.body.cast[idx].actors}`})
      cast.push({
        character: 
          req.body.cast[idx].character,
        actor: foundActor
      })
    }
    dreamcast.name = req.body.name
    dreamcast.image = req.body.photo
    dreamcast.tmdbID = req.body.tmdbID
    dreamcast.cast = cast
    dreamcast.author = req.user.profile
    dreamcast.save()
    profile.dreamCast = dreamcast
    profile.save()
    res.status(201).json(dreamcast)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const dreamcasts = await Dreamcast.find({})
    .populate('cast.actor')
    .sort({ createdAt: 'desc'})
  res.status(200).json(dreamcasts)
  } catch (error) {
    res.status(500).json(err)  
  }
}

const show = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findById(req.params.id)
    .populate({
      path:'cast.actor',
      model: 'Actor'})
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findById(req.params.dcId)
    .populate('cast.actor')
    const cast = dreamcast.cast.id(req.params.castId)
    cast.actor = req.body.actor
    await dreamcast.save()
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteDreamcast = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.dreamCast.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const dreamcast = await Dreamcast.findById(req.params.id)
    dreamcast.comments.push(req.body)
    await blog.save()
    const newComment = deleteDreamcast.comments[dreamcast.comments.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteDreamcast as delete,
  createComment
}