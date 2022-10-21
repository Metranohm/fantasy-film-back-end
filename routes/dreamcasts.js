import { Router } from 'express'
import * as dreamcastsCtrl from '../controllers/dreamcasts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, dreamcastsCtrl.create)
router.get('/', checkAuth, dreamcastsCtrl.index)


export { router }