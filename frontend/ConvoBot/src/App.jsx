import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../src/layouts/Home.jsx'
import SignUp from './layouts/SignUp.jsx'
import SignIn from "./layouts/SignIn.jsx"
import Dashboard from "./layouts/Dashboard.jsx"
import Chatbox from './components/ExternalChatbox.jsx'

export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard/:userId" element={<Dashboard/>}/>
          <Route path="/chatbot" element={<Chatbox/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}