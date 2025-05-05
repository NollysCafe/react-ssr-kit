import express from 'express'
import fs from 'fs'
import path from 'path'
import { log } from '../utils/logger'

const htmlPath = path.resolve(__dirname, '../../../frontend/index.html')
const entryServerPath = path.resolve(__dirname, '../../../frontend/dist/entry-server.js')

export default async function ssr(request: express.Request, response: express.Response, next: express.NextFunction) {
	try {
		if (!fs.existsSync(htmlPath) || !fs.existsSync(entryServerPath)) {
			log.warn('[SSR] Missing build files, skipping SSR')
			return next()
		}

		const html = fs.readFileSync(htmlPath, 'utf-8')
		const { render } = await import(entryServerPath)
		const stream = await render({ url: request.url })

		response.status(200).setHeader('Content-Type', 'text/html')
		const [head, tail] = html.split(`<div id='root'></div>`)

		response.write(head + `<div id='root'>`)
		stream.pipe(response, { end: false })
		stream.on('end', () => {
			response.write(`</div>${tail}`)
			response.end()
		})

		stream.on('error', (err: any) => {
			log.error('[SSR] Stream error:', err)
			response.status(500).end('SSR stream failed')
		})
	} catch (error: any) {
		log.error('[SSR] Failed:', error)
		if (!response.headersSent) {
			response.status(500).send('SSR failed')
		} else {
			next(error)
		}
	}
}
