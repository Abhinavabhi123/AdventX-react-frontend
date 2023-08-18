import NavBar from '../../NavBar/Navbar'
import { useNavigate } from 'react-router-dom'

function PaymentCancel() {
    const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex flex-col">
    <div className="w-screen h-20">
      <NavBar />
    </div>
    <div className="w-screen h-full flex justify-center items-center">
      <div className="w-[60%] h-[70%] bg-gray-200 bg-opacity-60 shadow-md shadow-gray-600 border border-gray-300 rounded-md flex flex-col justify-center items-center">

        <img className='absolute w-96' src="/gifs/paymentcancel.gif" alt="" />
        <div className='relative'>Payment Cancelled</div>
        <div className='relative'>
          <button className="w-36 h-10 rounded-md bg-red-400"
          onClick={()=>navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PaymentCancel
