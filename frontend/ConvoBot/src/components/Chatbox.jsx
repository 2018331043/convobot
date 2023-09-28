import * as React from "react";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '../styling/components/Chatbox.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import chatService from "../services/chat.service";
import apiKeyService from "../services/api.key.service";
import displayToast from "../services/toast.service";
import MicOffIcon from '@mui/icons-material/MicOff';
import Lottie from 'lottie-react'
import loading from '../assets/lottieLoading.json'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Chatbox({selectedChatbot,chatbotName,setChatActive}) {

  const [apiList,setApiList] = useState([])
  const [userApi,setUserApi] = useState('')
  const [tempList,setTempList] = useState([])
  const [isBotLoading,setIsBotLoading] = useState(false)
  const [isMicOn,setIsMicOn] = useState(false)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    displayToast.warning('Your browser does not support speech input',5000)
  }
  const backButtonClicked = () =>{
    setChatActive(false)
  }
  const [messages, setMessages] = useState([
    { id: uuidv4(), text: "Hi there!", sender: "bot" },
    // { id: 2, text: "Hello!", sender: "user" },
    { id: uuidv4(), text: "How can I help you?", sender: "bot" },
  ]);

  const [input, setInput] = useState(transcript);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      const newMessage = { id: uuidv4(), text: input, sender: "user" };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setIsBotLoading(true)
      chatService.sendText((res)=>{
        console.log(res.data.outputText)
        const newReplyMessage = { id: uuidv4(), text: res.data.outputText, sender: "bot" }
        const updatedMessagesWithReply = [...updatedMessages, newReplyMessage];
        setIsBotLoading(false)
        setMessages(updatedMessagesWithReply);
      },(err)=>{
        console.log('error')
        setIsBotLoading(false)
      },{
        text:input,
        id:selectedChatbot,
        api: userApi
      })
    }
    setInput("");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  useEffect(()=>{
    setInput(transcript)
  },[transcript])

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 189, 6)", // Change this to your desired color
      },
    },
  });
  useEffect(()=>{
    apiKeyService.getApiKeys((res)=>{
        setApiList(res)
        if(res.length===0){
          apiKeyService.generateApiKey((res)=>{
            setUserApi(res.value)
          },(err)=>{

          })
        }
      },(err)=>{
        console.log(err)
      })

    chatService.getChat((res)=>{
      const transformedMessages = res.map((item) => {
        if (item.role === 'system') {
          return null;
        }

        return {
          id: uuidv4(),
          text: item.content,
          sender: item.role === 'assistant' ? 'bot' : item.role,
        };
      }).filter(Boolean)
      setTempList(transformedMessages)
    },
    (err)=>{

    },
    {
      id:selectedChatbot
    }
    )
  },[])

  useEffect(()=>{
    if(apiList.length>0){
      setUserApi(apiList[0].value)
    }
  },[apiList])

  useEffect(()=>{
    setMessages(tempList)
    scrollBottom()
  },[tempList])

  const scrollBottom = (e) => {
    var targetDiv = document.querySelector('.chatbox-messages-container')
    try{
        targetDiv.scrollTop = targetDiv.scrollHeight
    }catch(e){
        console.log(e)
    }
}
  useEffect(()=>{
    scrollBottom()
  },[messages])
  return (
    <ThemeProvider theme={customTheme}>
      <div className="chatbox-container" style={{zIndex:1000}}>
        <div className="chatbox-nav" style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',borderBottom:'solid',
        borderBottomColor:'rgba(255, 189, 6, 0.849)',height:'60px'}}>
          <Typography variant="h6" sx={{ color: 'white', marginLeft: '30px',marginBottom:'0', display: 'flex', alignItems: 'center'}}>
            {chatbotName}
          </Typography>

        </div>
        <Box
          sx={{
            height: "calc(100% - 60px )",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
          }}
        >
          <Box className="chatbox-messages-container" sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <LoadingAnim isLoading={isBotLoading} />
          </Box>
          <Box sx={{ backgroundColor: "background.default", display: 'flex',padding:'15px 3px 10px 3px',borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px' }}>
            <TextField
            className="chatbox-container-textField"
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="text"
                    onClick={SpeechRecognition.startListening}
                    style={{ marginRight: '-15px' }}
                  >
                    <MicOffIcon sx={{ color: 'primary', marginTop: '0px' }} />
                  </Button>
                ),
              }}
            />
            <Button
              className="chatbox-container-send-button"
              color="primary"
              variant="contained"
              onClick={handleSend}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>

      </div>
    </ThemeProvider>
  );
}

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
          {isBot ? "B" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            padding:'13px 19px' ,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.light" : "",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '14px' }}>{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

const LoadingAnim = ({ isLoading }) => {
  const isBot = 'bot'
  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
          {isBot ? "B" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            padding:'0px 0px' ,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
        <Lottie style={{height:'40px',width:'80px'}} animationData={loading}/>
        </Paper>
      </Box>
    </Box>
  ):null;
}