import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import './App.css'
import User from "./routes/User"

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/*" element={<User/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
