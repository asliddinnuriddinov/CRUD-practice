import React, { useEffect, useState } from 'react'
import "./Main.scss"
import Container from '../../utils/Utils'
import instance from "../../api/"
import Loader from '../loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Main = () => {
    const [data,setData]=useState([])
    const searchData=useSelector(state=>state.searchData)
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        setIsLoading(true)
        instance.get("/users")
        .then(responce=>{setData(responce.data);setIsLoading(false)})
        .catch(err=>{console.error(err);setIsLoading(false)})
    },[])

    function deleteUser(id){
        setIsLoading(true)
        instance.delete(`/users/${id}`)
        .then(responce=>{
            instance.get("/users")
            .then(responce=>{setData(responce.data);setIsLoading(false);console.log(responce.data);})
            .catch(err=>{
                console.error(err)
                // setData([])
                setIsLoading(false)
            })
        })
        .catch(err=>console.error(err))
    }

  return (
    <Container>
        {
            isLoading?
            <Loader/>
            :
            data.length>0||searchData.length>0?
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role name</th>
                <th>Address</th>
                <th>Phone number</th>
                <th></th>
                </tr>
            </thead>
            <tbody>

                {
                    searchData?.length==0?
                    data?.map((x,i)=>
                            <tr onClick={e=>navigate(`/view/${x.id}`)} key={i}>
                                <td>{x.name}</td>
                                <td>{x.username}</td>
                                <td>{x.email}</td>
                                <td>{x.roleName}</td>
                                <td>{x.address}</td>
                                <td>{x.contact}</td>
                                <td>
                                    <button onClick={(e) =>{ e.stopPropagation();deleteUser(x.id) }}>Delete</button>
                                </td>
                            </tr>
                        ):
                        searchData?.map((x,i)=>
                        <tr onClick={e=>navigate(`/view/${x.id}`)} key={i}>
                            <td>{x.name}</td>
                            <td>{x.username}</td>
                            <td>{x.email}</td>
                            <td>{x.roleName}</td>
                            <td>{x.address}</td>
                            <td>{x.contact}</td>
                            <td>
                                <button onClick={(e) =>{ e.stopPropagation();deleteUser(x.id) }}>Delete</button>
                            </td>
                        </tr>
                        )
                }
            </tbody>
        </table>
        :
        <div className='no-user'>
            <h1>Users do not exist</h1>
        </div>
        }
    </Container>
  )
}

export default Main