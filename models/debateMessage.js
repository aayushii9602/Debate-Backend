import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const debateMessageSchema = new mongoose.Schema({
  message: String,

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  debateTopicId: {
    type: mongoose.Types.ObjectId,
    ref: 'debateTopic',
  },
})

const debateMessage = mongoose.model('debateMessage', debateMessageSchema)
export default debateMessage
