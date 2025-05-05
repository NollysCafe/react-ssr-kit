import { renderToReadableStream } from 'react-dom/server'

import App from './App'

export async function render(): Promise<ReadableStream> {
	return await renderToReadableStream(<App />, {
		bootstrapModules: ['/src/entry-client.tsx']
	})
}
