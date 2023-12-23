import React, { useEffect, useState } from 'react'
import "./Home.scss"
import Nav from '../../components/nav/Nav'
import Main from '../../components/main/Main'

const Home = () => {
  return (
    <div>
      <Nav/>
      <Main/>
    </div>
  )
}

export default Home