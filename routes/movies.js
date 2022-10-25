import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, moviesCtrl.index)
router.get('/:id', checkAuth, moviesCtrl.show)
router.put('/:id', checkAuth, moviesCtrl.update)
router.post('/', checkAuth, moviesCtrl.create)
router.post('/search', checkAuth, moviesCtrl.search)
router.post('/favorite', checkAuth, moviesCtrl.favorite)
router.delete('/:id', checkAuth, moviesCtrl.delete)
router.post('/credits/:id', checkAuth, moviesCtrl.credits)

export { router }

// router.get('/', checkAuth, actorsCtrl.index)
// router.delete('/favorite', checkAuth, actorsCtrl.deleteFavorite)
// router.get('/:id',checkAuth, actorsCtrl.show)
// router.put('/:id', checkAuth, actorsCtrl.update)
// router.post('/', checkAuth, actorsCtrl.create)
// router.post('/search', checkAuth, actorsCtrl.search)
// router.delete('/:id', checkAuth, actorsCtrl.delete)