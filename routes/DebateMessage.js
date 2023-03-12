import express from 'express'
const router = express.Router()
import {
  getDebateMessage,
  createNewMessage,
} from '../controllers/messageController'
router.route('/createNewMessage').post(createNewMessage)
// router.route('/getDebateMessage').get(getDebateMessage)
// router.route('/updateMessage/:id').put()
// router.route('/deleteMessage/:id').delete()
export default router
