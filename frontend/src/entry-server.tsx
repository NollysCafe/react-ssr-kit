import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'stream'

import { StaticRouter } from 'react-router-dom'

import App from './App'

export function render({ url }: { url: string }): Promise<ReadableStream> {
	void url
	return new Promise((resolve, reject) => {
		const { pipe } = renderToPipeableStream(
			<React.Fragment>
				<StaticRouter location={url}>
					<App />
				</StaticRouter>
			</React.Fragment>,
			{
				onShellReady() {
					const stream = new PassThrough()
					pipe(stream)
					resolve(stream as unknown as ReadableStream)
				},
				onShellError(error: any) {
					reject(error)
				},
				onError(error: any) {
					console.error('[SSR] render error:', error)
				}
			}
		)
	})
}
