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
    const [reportType,setReportType] = useState('chatbot')
    const [apiList,setApiList] = useState([])

    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)",
          },
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
    return (
        <div className="dashboard-body">
            <Sidebar apiList={apiList} setOpenReport={setOpenReport} chatActive={chatActive} setChatActive={setChatActive} selectedChatbot={selectedChatbot} setSelectedChatbot={setSelectedChatbot}
             setSelectedChatbotInfo={setSelectedChatbotInfo} chatbotList={chatbotList} setChatBotList={setChatBotList} openWidget={openWidget} setOpenWidget={setOpenWidget} setOpenAdvanced={setOpenAdvanced}/>
            <div className='dashboard-right'>
                {loading? (<ThemeProvider theme={customTheme}>
                <Box sx={{ width: '100%' }}>
                <LinearProgress />
                </Box>
                </ThemeProvider>):null}
                <Navbar setApiList={setApiList} chatbotList={chatbotList} selectedChatbot={selectedChatbot} setSelectedChatbot={setSelectedChatbot} openReport={openReport} setOpenReport={setOpenReport}/>
                <div className='dashboard-right-container'>
                <ChildSiidebar reportType={reportType} setReportType={setReportType} openReport={openReport} chatActive={chatActive} setChatActive={setChatActive} 
                openWidget={openWidget} setOpenWidget={setOpenWidget} 
                selectedChatbot={selectedChatbot} openAdvanced={openAdvanced} setOpenAdvanced={setOpenAdvanced}/>
                {(openReport ? <DetailedReport reportType={reportType}/> : <ChatbotInfo apiList={apiList} chatActive={chatActive} setChatActive={setChatActive} selectedChatbot={selectedChatbot}
                setSelectedChatbot={setSelectedChatbot} selectedChatbotInfo={selectedChatbotInfo}
                setChatBotList={setChatBotList} openWidget={openWidget} setOpenWidget={setOpenWidget} chatbotList={chatbotList}
                openAdvanced={openAdvanced} setOpenAdvanced={setOpenAdvanced} />)}
                </div>
            </div>
        </div>
    )
}