import Message from '../models/debateMessage.js'
import bigPromise from '../middlewares/bigPromise.js'
import { cookieToken } from '../utils/cookieToken.js'
import { mailHelper } from '../utils/mailHelper.js'
import crypto from 'crypto'

export const createNewMessage = bigPromise(async (req, res, next) => {
  try {
    const { newMessage } = req.body
    if (!newMessage) {
      return res
        .status(400)
        .json({ success: false, message: 'enter a valid message!' })
    }
    return res.status(200).jason({ success: true, data: newMessage })
  } catch (error) {
    console.log(`${error}`)
  }
})
