import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './home/Home'
import Create from './create/Create'
import View from './view/View'

const RootRoute = () => {
  return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<Create/>} />
            <Route path='/view/:id' element={<View/>}/>
        </Routes>
  )
}

export default RootRoute