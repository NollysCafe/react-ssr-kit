import session from 'express-session'
import { config } from '../config/env'

if (!config.session.secret) throw new Error('Session secret is not defined in the configuration.')

export default session({
	secret: config.session.secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: config.env === 'production',
		sameSite: config.env === 'production' ? 'none' : 'lax',
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
})
