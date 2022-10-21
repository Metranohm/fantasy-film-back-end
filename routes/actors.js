import { Router } from 'express'
import * as actorsCtrl from '../controllers/actors.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, actorsCtrl.index)
router.post('/', checkAuth, actorsCtrl.create)

export { router }
