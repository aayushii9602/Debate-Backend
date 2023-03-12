import User from '../models/User.js'
import bigPromise from '../middlewares/bigPromise.js'
import { cookieToken } from '../utils/cookieToken.js'
import { mailHelper } from '../utils/mailHelper.js'
import crypto from 'crypto'

export const signup = bigPromise(async (req, res, next) => {
  const { username, email, password, role } = req.body
  // console.log(name)
  if (!email || !username || !password || !role) {
    return res.status(400).json({
      success: 'false',
      message: 'Name, Email and Password fields are required.',
    })
  }

  const existingUser = await User.findOne({ email })
  console.log(existingUser)
  if (existingUser) {
    return res.status(400).json({
      success: 'false',
      message: 'User Already Exists',
    })
  }
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: password,
    role: role,
  })
  user.password = undefined
  res.status(200).json({
    success: true,
    message: 'User added successfully!',
    user,
  })
})

export const login = bigPromise(async (req, res, next) => {
  const { username, password } = req.body
  if (!(username && password)) {
    return res.status(400).json({
      success: 'false',
      message: 'Email and Password fields are required.',
    })
  }
  const user = await User.findOne({ username: username })

  if (!user) {
    return res.status(400).json({
      success: 'false',
      message: "You're not registered in our app",
    })
  }

  const isPasswordCorrect = await user.isValidatedPassword(
    password,
    user.password
  )

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: 'false',
      message: 'Incorrect Password',
    })
  }

  res.status(200).json({
    success: true,
    message: 'User logged in successfully!',
    user,
  })
})

export const logout = bigPromise(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'loggedOut Successfully',
  })
})
