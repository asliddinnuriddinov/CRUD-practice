import React, { useState } from 'react'
import "./Create.scss"
import { useNavigate } from 'react-router-dom'
import Container from '../../utils/Utils'
import instance from "../../api/"

const Create = () => {
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [contact,setContact]=useState("")
    const [role,setRole]=useState("")
    const [address,setAddress]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    function clearForm(){
        setName("")
        setUsername('')
        setEmail('')
        setContact('')
        setRole('')
        setAddress('')
    }

    function createUser(e){
        e.preventDefault()
        setIsLoading(true)
        instance.post('/users',{
            name:name,
            username:username,
            email:email,
            contact:contact,
            roleName:role,
            address:address
        })
        .then(responce=>{
            setIsLoading(false)
            clearForm()
        })
        .catch(err=>{
            console.error(err)
            setIsLoading(false)
            clearForm()
        })
    }
  return (
    <Container>
        <div className='create'>
            <button onClick={e=>navigate('/')}>Back</button>
            <div className="create__user">
                <form onSubmit={e=>createUser(e)}>
                    <input value={name} onChange={e=>setName(e.target.value)} required type="text" placeholder='Name'/>
                    <input value={username} onChange={e=>setUsername(e.target.value)} required type="text" placeholder='Username'/>
                    <input value={email} onChange={e=>setEmail(e.target.value)} required type="text" placeholder='Email'/>
                    <input value={contact} onChange={e=>setContact(e.target.value)} required type="number" placeholder='Contact'/>
                    <input value={role} onChange={e=>setRole(e.target.value)} required type="text" placeholder='Role'/>
                    <input value={address} onChange={e=>setAddress(e.target.value)} required type="text" placeholder='Address'/>
                    <button disabled={isLoading}>{isLoading?"Creating in process...":"Create"}</button>
                </form>
            </div>
        </div>
    </Container>
  )
}

export default Create