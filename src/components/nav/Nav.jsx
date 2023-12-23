import React, { useEffect, useState } from 'react'
import "./Nav.scss"
import Container from '../../utils/Utils'
import { useNavigate } from 'react-router-dom'
import instance from "../../api/"
import { useDispatch } from 'react-redux'

const Nav = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [search,setSearch]=useState('')

    useEffect(()=>{
      instance.get(`/users?name=${search}`)
      .then(responce=>{console.log(responce.data);dispatch({searchDataPassed:responce.data,type:"SET_SEARCH_DATA"});})
      .catch(err=>console.error(err))
    },[search])

  return (
    <Container>
    <nav>
        <button onClick={e=>navigate('/create')}>Create User</button>
        <form onSubmit={e=>e.preventDefault()}>
            <input value={search} onChange={e=>{setSearch(e.target.value)}} type="text" placeholder='Search by name' />
            <button>Search</button>
        </form>
        <input type="date" />
    </nav>
    </Container>
  )
}

export default Nav