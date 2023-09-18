import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'
import { useLocation } from 'react-router-dom'

export default function Chat({socket}) {
 const [users,setUsers]=useState(null)
 const [user,setUser]=useState(null)
 const [content,setContent]=useState([])
 const [welcomeMessage,setWelComeMessage]=useState('')
const location=useLocation();
 const {username}=location.state





  useEffect(()=>{
    socket.on('send welcome message from server to client',(message)=>{
    
     setWelComeMessage(message)
    })

    socket.on('send join message from server to client',message=>{
       
        setContent(prev=>([...prev,message]))
    })

    socket.on('send message from server to client',(message)=>{
      setContent(prev=>([...prev,message]))
      setUser(message)
 })
  socket.on('share location from server to client',location=>{
    setContent(prev=>([...prev,{...location,isLocation:true}]))
    setUser({...location,isLocation:true})
  })
 
socket.on('send userList from server to client',(userList)=>{
 setUsers(userList)
})

socket.on('message just left the room',message=>{
  setContent(prev=>([...prev,message]))
})



  },[socket])
 
  return (
    <div className='flex '>
      <Sidebar users={users} />
      <Content socket={socket} content={content} welcomeMessage={welcomeMessage} user={user} username={username}/>
    </div>
  );
}
