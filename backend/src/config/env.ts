import 'tsconfig-paths/register'
import 'dotenv/config'

export const config = {
	// Environment
	env: process.env.NODE_ENV || 'development',
	backendPort: Number(process.env.BACKEND_PORT!),

	// Express Session
	session: {
		secret: process.env.SESSION_SECRET!,
	},
}
