import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home.jsx'
import SignUp from './SignUp.jsx'
import SignIn from "./SignIn.jsx"

export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}