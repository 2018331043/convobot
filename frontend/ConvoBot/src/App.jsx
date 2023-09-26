import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../src/layouts/Home.jsx'
import SignUp from './layouts/SignUp.jsx'
import SignIn from "./layouts/SignIn.jsx"
import Dashboard from "./layouts/Dashboard.jsx"
import Chatbox from './components/ExternalChatbox.jsx'
import { ToastContainer } from 'react-toastify';
import SpeechToText from "./components/SpeechToText.jsx";
import DetailedReport from "./components/DetailedReport.jsx";

export default function App(){

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard/:userId" element={<Dashboard/>}/>
          <Route path="/chatbot/:key/:chatbotId" element={<Chatbox/>}/>
          <Route path="/speech-to-text" element={<SpeechToText/>}/>
          <Route path="/detailed-report" element={<DetailedReport/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}