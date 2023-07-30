import React,{useEffect} from 'react'
import UserAxios from '../../../Store/Axios/UserConfig';

interface Props{
  commId:string|number;
}

function ChatRoom({commId}:Props) {
useEffect(() => {
  (async()=>{
    await UserAxios.get('/communityData',{params:{commId}}).then((response)=>{
      console.log(response);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  })()
}, [commId])
  

  return (
    <div className='h-[97%] w-[97%] bg-gray-200 border bg-opacity-50 border-violet-500 rounded-md border-dashed flex '>
      <div className=' w-[60%] h-full bg-orange-400 rounded-t-md'>
        <div className='w-full h-[4rem] bg-green-400 rounded-t-md'></div>
        <div className='w-full h-[]'></div>
      </div>
      <div className=' w-[40%] h-full bg-violet-400'></div>
    </div>
  )
}

export default ChatRoom
