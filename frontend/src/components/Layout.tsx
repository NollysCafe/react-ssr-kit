import React from 'react'

import { Link, Outlet } from 'react-router-dom'

export default function Layout(): React.ReactElement {
	return (
		<div>
			<nav>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
				</ul>
			</nav>

			<hr />

			<Outlet />
		</div>
	)
}
