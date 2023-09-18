import React, { useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Content({socket,content,welcomeMessage,user,username}) {
   const [message,setMessage]=useState('')


   const handleSend=()=>{
      const acknowlegements=(error)=>{ 
         if(error){
             return alert(error) 
         }
    
      }
     socket.emit('send message from client to server',message,acknowlegements); 
  
   }
   const handleShareLocation=()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
         const {latitude,longitude}=position.coords   
         socket.emit('share location from client to server',{latitude,longitude })
     })
   }
  return (
   <div className='relative w-full	h-screen'>
       <ScrollToBottom className='h-[80%] border overflow-y-auto'>
       <div className='pl-4 pt-2 mb-2' >
         <div >
            <span className='font-bold mr-2 '>{welcomeMessage? 'Admin':''}</span>
            <small>{welcomeMessage.createdAt}</small>
         </div>
         <span className='bg-green-600 p-1  mt-4 text-white rounded'>{welcomeMessage.messageText}</span>
   </div>
       {content.map((item,index)=>{
         return   <div key={index} className={`${item.id==welcomeMessage.id?'flex justify-end  ':'' }`}>
            <div className='pl-4 pt-2 mb-2' >
         <div >
            <span className='font-bold mr-2'>{item.username ? item.username :'Admin'}</span>
            <small>{item?.createdAt}</small>
         </div>
         {
             
            <span
            className={`${item.id==welcomeMessage.id?'bg-blue-600 p-1  mt-4 text-white rounded': 'bg-green-600 p-1  mt-4 text-white rounded' }`}>{item.isLocation? <span>My location:<a href={item.messageText} target='_blank'> {item.messageText}</a></span>:item.messageText }
            </span>
         }
   </div>
         </div>
   
      })}
      
       </ScrollToBottom>
 
     <div className=' bottom-0 flex w-full absolute'>
     <input type='text' name='message' onChange={(e)=>setMessage(e.target.value)}
      onKeyPress={(e)=>{e.key=='Enter' && handleSend()}}
    className='border border-[black] outline-none  w-full pl-2 rounded' /> 
    <button className='p-4 border border-[black]' onClick={()=>handleSend()}> send</button>
     <button className='p-4 border border-[black]' onClick={()=>handleShareLocation()}> Share location</button>
     </div>
   </div>
  )
}
