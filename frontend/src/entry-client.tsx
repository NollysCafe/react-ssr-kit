import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'


const rootElement = document.getElementById('root') as HTMLDivElement
if (!rootElement) throw new Error('Root element not found')

ReactDOM.hydrateRoot(rootElement, (
	<React.Fragment>
		<App />
	</React.Fragment>
))
