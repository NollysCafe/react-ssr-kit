import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Home from './views/Home'
import About from './views/About'

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}
