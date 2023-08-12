import { useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/Navbar'
import  cancelGif from "/gifs/paymentcancel.gif"

function EventPaymentCancel() {
  const navigate = useNavigate()
  return (
    <div className="w-[100vw] h-[100vh]">
    <div className="w-full h-20">
      <NavBar />
    </div>
    <div className='w-full h-[89.2%] bg-gray-200 bg-opacity-50 flex justify-center items-center'>
      <div className='w-[80%] h-[90%]  flex flex-col justify-center items-center'>
        <img className='w-[40%] h-[70%] absolute' src={cancelGif} alt="cancel gif" />
        <button className='relative bg-red-500 w-44 h-10 mt-96  rounded-md' onClick={()=>navigate("/")}>
          Back to Home Page
        </button>
      </div>

    </div>
    </div>
  )
}

export default EventPaymentCancel
