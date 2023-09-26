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

export default function Chatbox({selectedChatbot,chatbotName,setChatActive}) {

  const [apiList,setApiList] = useState([])
  const [userApi,setUserApi] = useState('')
  const [tempList,setTempList] = useState([])
  const [isBotLoading,setIsBotLoading] = useState(false)
  const backButtonClicked = () =>{
    setChatActive(false)
  }
  const [messages, setMessages] = useState([
    { id: uuidv4(), text: "Hi there!", sender: "bot" },
    // { id: 2, text: "Hello!", sender: "user" },
    { id: uuidv4(), text: "How can I help you?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend(); 
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      // console.log(input);
      const newMessage = { id: uuidv4(), text: input, sender: "user" };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages); // Create a new array with the existing messages and the new message
      setIsBotLoading(true)
      // console.log(input)
      // console.log(selectedChatbot)
      // console.log(userApi)
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
        // console.log(res.length)
        if(res.length===0){
          // console.log(('wow'))
          apiKeyService.generateApiKey((res)=>{
            setUserApi(res.value)
          },(err)=>{
  
          })
        }
        // else{
        //   setUserApi(apiList[0].value)
        // }
      
      },(err)=>{
        console.log(err)
      })

    chatService.getChat((res)=>{
      // console.log(res)
      const transformedMessages = res.map((item) => {
        if (item.role === 'system') {
          // Skip creating a message for 'system' role
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
      // console.log(userApi)
    }
  },[apiList])

  useEffect(()=>{
    setMessages(tempList)
    scrollBottom()
  },[tempList])

  const scrollBottom = (e) => {
    // console.log('ohhhhhh')
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
            {/* Convo<span className="chatbox-span-1">Bot</span> */}
            {chatbotName}
          </Typography>
          {/* <IconButton
              aria-label="open menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={backButtonClicked}
              sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px'}}
            >
            <ArrowBackIcon sx={{color:'white',marginRight:'20px'}}/>
          </IconButton> */}

        </div>
        <Box
          sx={{
            // paddingTop: '10px',
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
                    onClick={handleSend}
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
  // console.log("isLoading:", isLoading);
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
            // backgroundColor: isBot ? "primary.light" : "",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
        <Lottie style={{height:'40px',width:'80px'}} animationData={loading}/>
        </Paper>
      </Box>
    </Box>
  ):null;
}