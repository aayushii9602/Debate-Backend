import debateTopic from '../models/debateTopic.js'
import bigPromise from '../middlewares/bigPromise.js'
import { cookieToken } from '../utils/cookieToken.js'
import { mailHelper } from '../utils/mailHelper.js'
import crypto from 'crypto'

export const setNewTopic = bigPromise(async (req, res, next) => {
  try {
    const { newTopic } = req.body
    console.log(newTopic)
    if (!newTopic) {
      return res
        .status(400)
        .json({ success: false, message: 'enter a valid Topic!' })
    }
    const newT = await debateTopic.create({ ...req.body })
    return res
      .status(200)
      .jason({ success: true, message: 'topic added!', newT })
  } catch (error) {
    console.log(`${error}`)
  }
})
