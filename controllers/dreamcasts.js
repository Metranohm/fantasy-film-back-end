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

export {
  create
}