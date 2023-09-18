import React from 'react'

export default function Sidebar({users}) {
 
  return (
    <div className='w-[20%] bg-slate-400 h-screen px-2'>
         <div className='text-center font-bold text-[24px] 	'> {users && users[0].room}</div>
         <div>
           {users?.map((item,index)=>{
             return  <div className='bg-slate-700 text-white p-2 my-2 rounded' key={index}>{item.username}</div>
           })}
              
         </div>
    </div>
  )
}
