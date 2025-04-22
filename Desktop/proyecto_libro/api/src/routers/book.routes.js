import express from 'express'
import { availableBooks, getAllBooks } from '../controllers/book.controller.js'

const router = express.Router()

router.get('/list', getAllBooks)
router.get('/available', availableBooks)

export default router