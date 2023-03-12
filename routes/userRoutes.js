import express from 'express'
const router = express.Router()

// import controllers
import { login, register } from '../controllers/userController.js'

router.route('/register').post(register)
router.route('/login').post(login)
// router.route('/createUser').post(createUser)
// router.route('/deleteUser/:id').delete(deleteUser)
// router.route('/retriveUser').get(retriveUser)
// router.route('/updateUser/:id').put(updateUser)

export default router
