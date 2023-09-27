import '../styling/Dashboard.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ChatbotInfo from '../components/ChatbotInfo'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState,useEffect } from 'react';
import axios from 'axios'
import apiKeyService from '../services/api.key.service.js'
import authService from '../services/auth.service.js';
import ChildSiidebar from '../components/ChildSidebar';
import DetailedReport from "../components/DetailedReport.jsx";

const axiosInstance = axios.create();

export default function Dashboard(){

    //set true to trigger loading animation

    const [loading,setLoading]=useState(false)
    const [chatActive,setChatActive] = useState(false)
    const [selectedChatbot,setSelectedChatbot] = useState(null)
    const [selectedChatbotInfo,setSelectedChatbotInfo] = useState(null)
    const [chatbotList,setChatBotList] = useState([])
    const [openWidget,setOpenWidget] = useState(false)
    const [openReport,setOpenReport] = useState(false)
    const [openAdvanced,setOpenAdvanced] = useState(false)

    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)", // Change this to your desired color
            // main: "rgb(0,0,0,.9)",
          },
          // You can also customize other colors like secondary, error, etc.
        },
      });
      const signOutUser = () => {
        localStorageService.setToken("")
        localStorageService.setUserInfo({})
        localStorage.setItem("navImage","")
        window.location.replace('../')
      };

      useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
          (response) => response,
          (error) => {
            if (error.response && error.response.status === 403) {
              signOutUser(); // Implement your sign-out function
            }
            return Promise.reject(error);
          }
        );
        return () => {
          axiosInstance.interceptors.response.eject(responseInterceptor);
        };
      }, [])

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
            <Sidebar chatActive={chatActive} setChatActive={setChatActive} selectedChatbot={selectedChatbot} setSelectedChatbot={setSelectedChatbot}
             setSelectedChatbotInfo={setSelectedChatbotInfo} chatbotList={chatbotList} setChatBotList={setChatBotList} openWidget={openWidget} setOpenWidget={setOpenWidget}/>
            <div className='dashboard-right'>
                {loading? (<ThemeProvider theme={customTheme}>
                <Box sx={{ width: '100%' }}>
                <LinearProgress />
                </Box>
                </ThemeProvider>):null}
                <Navbar/>
                <div className='dashboard-right-container'>
                <ChildSiidebar chatActive={chatActive} setChatActive={setChatActive} 
                openWidget={openWidget} setOpenWidget={setOpenWidget} 
                selectedChatbot={selectedChatbot} openAdvanced={openAdvanced} setOpenAdvanced={setOpenAdvanced}/>
                {(openReport ? <DetailedReport/> : <ChatbotInfo chatActive={chatActive} setChatActive={setChatActive} selectedChatbot={selectedChatbot}
                setSelectedChatbot={setSelectedChatbot} selectedChatbotInfo={selectedChatbotInfo}
                setChatBotList={setChatBotList} openWidget={openWidget} setOpenWidget={setOpenWidget} chatbotList={chatbotList}
                openAdvanced={openAdvanced} setOpenAdvanced={setOpenAdvanced} />)}
                </div>
            </div>
        </div>
    )
}