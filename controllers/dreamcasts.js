import { Profile } from "../models/profile.js"
import { Dreamcast } from "../models/dreamcast.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const dreamcast = await Dreamcast.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { dreamcasts: dreamcast } },
      { new: true }
    )
    dreamcast.author = profile
    res.status(201).json(dreamcast)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const dreamcasts = await Dreamcast.find({})
    .populate('author')
    .sort({ createdAt: 'desc'})
  res.status(200).json(dreamcasts)
  } catch (error) {
    res.status(500).json(err)  
  }
}

const show = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findById(req.params.id)
      .populate('author')
      .populate('comments.author')
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteDreamcast = async (req, res) => {
  try {
    const dreamcast = await Dreamcast.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.dreamcasts.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(dreamcast)
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteDreamcast as delete
}