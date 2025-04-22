import express from 'express'
import morgan from 'morgan'
import router from './routers/book.routes.js'
import cors from 'cors'

export const server = express()

server.use(cors())
server.use(morgan('dev'))
server.use('/api', router)



