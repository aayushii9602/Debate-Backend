import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const debateTopicSchema = new mongoose.Schema({
  topic: { type: String },
})

const debateTopic = mongoose.model('debateTopic', debateTopicSchema)
export default debateTopic
