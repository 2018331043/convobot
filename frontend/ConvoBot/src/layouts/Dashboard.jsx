import '../styling/Dashboard.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ChatbotInfo from '../components/ChatbotInfo'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState,useEffect } from 'react';

import apiKeyService from '../services/api.key.service.js'
import authService from '../services/auth.service.js';


export default function Dashboard(){

    //set true to trigger loading animation

    const [loading,setLoading]=useState(false)
    const [chatActive,setChatActive] = useState(false)
    const [selectedChatbot,setSelectedChatbot] = useState(null)
    const [selectedChatbotInfo,setSelectedChatbotInfo] = useState(null)
    const [chatbotList,setChatBotList] = useState([])

    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)", // Change this to your desired color
            // main: "rgb(0,0,0,.9)",
          },
          // You can also customize other colors like secondary, error, etc.
        },
      });

    // useEffect(()=>{
    //   console.log(selectedChatbot)
    //   console.log(selectedChatbotInfo)
    // },[selectedChatbot])
    // useEffect(()=>{
    //   apiKeyService.apiKey((res)=>{
    //     console.log(res)
    //   },(e)=>{
    //     console.log(e)
    //   })
    // },[])
    return (
        <div className="dashboard-body">
            <Sidebar setChatActive={setChatActive} selectedChatbot={selectedChatbot} setSelectedChatbot={setSelectedChatbot}
             setSelectedChatbotInfo={setSelectedChatbotInfo} chatbotList={chatbotList} setChatBotList={setChatBotList}/>
            <div className='dashboard-right'>
                {loading? (<ThemeProvider theme={customTheme}>
                <Box sx={{ width: '100%' }}>
                <LinearProgress />
                </Box>
                </ThemeProvider>):null}

                <Navbar/>
                <ChatbotInfo chatActive={chatActive} setChatActive={setChatActive} selectedChatbot={selectedChatbot} selectedChatbotInfo={selectedChatbotInfo} setChatBotList={setChatBotList} />
            </div>
        </div>
    )
}