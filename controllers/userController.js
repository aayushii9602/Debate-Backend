import bigPromise from '../middlewares/bigPromise.js'
import User from '../models/User.js'
import { mailHelper } from '../utils/mailHelper.js'
import { cookieToken } from '../utils/cookieToken.js'
import crypto from 'crypto'

export const register = bigPromise(async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body
    if (!username || !password || !email || !role) {
      return res
        .status(400)
        .json({ success: false, message: 'all fields are required!' })
    }
    const existingUser = await User.findById({ email: email })
      .lean()
      .catch((ExistingUsererror) => {
        console.log(
          `Error while checking for existing user:: ${ExistingUsererror}`
        )
      })
    if (existingUser) {
      return res
        .status(500)
        .json({ success: false, message: 'User already exits!' })
    }
    const user = await User.create({ ...req.body })
    return res
      .status(200)
      .json({ succes: true, mesaage: 'User created successfully!', data: user })
  } catch (error) {
    console.log(`Error while registering/Creating a user:: ${error}`)
  }
})

export const login = bigPromise(async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'all fields are required!' })
    }
    const existingUser = await User.findOne({ username })
      .lean()
      .catch((error) => {
        console.log(`Error while checking for existing user:: ${error}`)
      })
    console.log(existingUser)
    if (!existingUser) {
      return res.status(500).json({
        success: false,
        message: 'No such User exists, Register first!',
      })
    }
    const isPasswordCorrect = await existingUser.isValidatedPassword(
      password,
      existingUser.password
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
      existingUser,
    })
  } catch (error) {
    console.log(`error while login-ing:: ${error}`)
  }
})

//retrive by id
//update by id
//lean
//status code
//clean code
// {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
