import express from 'express'
const router = express.Router()

import { setNewTopic } from '../controllers/topicController.js'
router.route('/setNewTopic').post(setNewTopic)
export default router
