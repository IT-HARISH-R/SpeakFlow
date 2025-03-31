import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Comunicate from './page/Comunicate'

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comunicate' element={<Comunicate />} />
      </Routes>
    </Router>


  )
}

export default App