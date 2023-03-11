import bigPromise from '../middlewares/bigPromise.js'
import User from '../models/User.js'

export const createUser = bigPromise(async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Enter all the fields' })
    }
    //check if the user exists
    const existingUser = await User.findOne({ email: email })
      .lean()
      .catch((error) => {
        console.log(`error is ${error}`)
      })
    if (existingUser) {
      return res
        .status(500)
        .json({ success: true, message: 'User already Exits' })
    }
    //create user
    const user = await User.create({ ...req.body })
    return res
      .status(200)
      .json({ success: true, message: 'User created successfully', data: user })
  } catch (error) {
    console.log(`Error while creating user: ${error}`)
  }
})

export const deleteUser = bigPromise(async (req, res, next) => {
  try {
    const id = req.params.id
    const existingUser = await User.findByIdAndDelete({ _id: id })
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'no such user exists!' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'user deleted successfully' })
  } catch (error) {
    console.log(`Error while deleting the user:: ${error}`)
  }
})

export const updateUser = bigPromise(async (req, res, next) => {
  try {
    const Id = req.params.id
    const existingUser = await User.findById({ _id: Id })
      .lean()
      .catch((error) => {
        console.log(`error existing user:: ${error}`)
      })
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'no such user exists!' })
    }
    const newData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    }
    const updatedValue = await User.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }).catch((error) => {
      console.log(`error while updating :: ${error}`)
      return null
    })
    console.log(updatedValue)
    if (updatedValue === null) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server error' })
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Updated successfully',
        data: existingUser,
      })
      .send(updatedValue)
  } catch (err) {
    console.log(`error while updating a user:: ${err}`)
  }
})

export const retriveUser = bigPromise(async (req, res, next) => {
  try {
  } catch (error) {
    console.log(`error while retriving the users:: ${error}`)
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
