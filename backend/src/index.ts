import { config } from './config/env'
import { log } from './utils/logger'

import App from './config/app'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from './middlewares/compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import session from './middlewares/session'
import ssr from './middlewares/ssr'

import { loadRoutesFrom } from './utils/loadRoutes'
import path from 'path'


// Create App instance
const app = new App()

// ROUTES
const routes = loadRoutesFrom(path.resolve(__dirname, 'routes'))
routes.forEach(({ path, router }) => app.addRoute(path, router))

// MIDDLEWARES
app.addMiddleware(bodyParser.json())
app.addMiddleware(bodyParser.urlencoded({ extended: true }))
app.addMiddleware(cookieParser())
app.addMiddleware(compression)
app.addMiddleware(cors({ credentials: true }))
app.addMiddleware(helmet())
app.addMiddleware(morgan('dev'))
app.addMiddleware(session)
app.addMiddleware(ssr)

// Start server
app.start(config.backendPort, async () => {
	log.success(`[Main] server running at http://localhost:${config.backendPort}`)
})
