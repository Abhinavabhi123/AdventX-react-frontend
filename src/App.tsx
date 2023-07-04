import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import './App.css'
import User from "./routes/User"
import Admin from "./routes/Admin"

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/*" element={<User/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
