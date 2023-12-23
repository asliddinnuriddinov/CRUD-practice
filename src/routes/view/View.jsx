import React, { useEffect, useState } from "react";
import "./View.scss";
import instance from "../../api/";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../utils/Utils";
import Loader from "../../components/loader/Loader";

const View = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [isLoading,setIsLoading]=useState(false)
  const [editOpen,setEditOpen]=useState(false)
  const navigate=useNavigate()
  const [name,setName]=useState("")
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [contact,setContact]=useState("")
  const [role,setRole]=useState("")
  const [address,setAddress]=useState("")
  const [isEdtiting,setIsEditing]=useState(false)

  useEffect(() => {
    setIsLoading(true)
    instance
      .get(`/users/${id}`)
      .then((responce) => {
        setProfile(responce.data);
        setDate(new Date(responce.data.createdAt * 1000));
        setName(responce.data.name)
        setUsername(responce.data.username)
        setEmail(responce.data.email)
        setAddress(responce.data.address)
        setContact(responce.data.contact)
        setRole(responce.data.roleName)
        setIsLoading(false)
      })
      .catch((err) => {console.error(err);setIsLoading(false)});
  }, []);

  function deleteUser(){
    setIsLoading(true)
    instance.delete(`/users/${id}`)
    .then(responce=>{
        setIsLoading(false)
        navigate('/')
    })
    .catch(err=>{console.error(err);setIsLoading(false)})
}

function editUser(e){
  e.preventDefault()
  setIsEditing(true)
  instance.put(`/users/${id}`,{
    name:name,
    username:username,
    email:email,
    contact:contact,
    roleName:role,
    address:address
  })
  .then(responce=>{
    setEditOpen(false)
    setIsEditing(false)
    instance
    .get(`/users/${id}`)
    .then((responce) => {
      setProfile(responce.data);
      setDate(new Date(responce.data.createdAt * 1000));
      setName(responce.data.name)
      setUsername(responce.data.username)
      setEmail(responce.data.email)
      setAddress(responce.data.address)
      setContact(responce.data.contact)
      setRole(responce.data.roleName)
      setIsLoading(false)
    })
    .catch((err) => {console.error(err);setIsLoading(false)});
  })
  .catch(err=>{
    console.error(err)
    setEditOpen(false)
    setIsEditing(false)
  })
}
  return (
    isLoading?
    <Loader/>
    :
    <Container>
      <div className="profile">
        <button onClick={e=>navigate('/')} className="back-btn">Back</button>
        <div className="profile__info">
          <p>Name: {profile?.name}</p>
          <p>Username: {profile?.username}</p>
          <p>Email: {profile?.email}</p>
          <p>Number: {profile?.contact}</p>
          <p>Role: {profile?.roleName}</p>
          <p>Address: {profile?.address}</p>
          <p>Created at: {date?.toLocaleString()}</p>
          <p>
            Edited at:{new Date(profile?.modifiedAt * 1000).toLocaleString()}
          </p>
        </div>
        <button onClick={e=>setEditOpen(true)} className="edit-btn">Edit</button>
        <button onClick={e=>deleteUser()} className="delete-btn">Delete</button>
        {
            editOpen?
            <div className="edit">
                <div className="edit__wrapper">
                <form onSubmit={e=>editUser(e)}>
                <input value={name} onChange={e=>setName(e.target.value)} required type="text" placeholder='Name'/>
                <input value={username} onChange={e=>setUsername(e.target.value)} required type="text" placeholder='Username'/>
                <input value={email} onChange={e=>setEmail(e.target.value)} required type="text" placeholder='Email'/>
                <input value={contact} onChange={e=>setContact(e.target.value)} required type="number" placeholder='Contact'/>
                <input value={role} onChange={e=>setRole(e.target.value)} required type="text" placeholder='Role'/>
                <input value={address} onChange={e=>setAddress(e.target.value)} required type="text" placeholder='Address'/>
                <div className="edit-btn-wrapper">
                <button className="edit-btn edit-btn-2" >{isEdtiting?"Editing in process...":"Edit"}</button>
                <button onClick={e=>setEditOpen(false)} className="cancel-btn">Cancel</button>
                </div>
                </form>
                </div>
            </div>
            :
            null
        }
      </div>
    </Container>
  );
};

export default View;
