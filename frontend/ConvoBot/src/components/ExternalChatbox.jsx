import logo from '../assets/bot.png'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
// import AssistantIcon from '@mui/icons-material/Assistant';
import { InputAdornment } from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import '../styling/components/ExternalChatbox.css'
import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import SendIcon from "@mui/icons-material/Send";
import '../styling/components/Chatbox.css';
import minimizeImg from '../assets/minimize.png'
import MicOffIcon from "@mui/icons-material/MicOff.js";
import chatService from "../services/chat.service";
import apiKeyService from "../services/api.key.service";
import { useParams } from 'react-router-dom';

export default function ExternalChatbox(){

  const [isChatbotInfoVisible, setIsChatbotInfoVisible] = useState(false);
  const {key,id} = useParams()

  const handleMinimizeClick = () => {
    setIsChatbotInfoVisible((prev) => !prev);
  };
  const [tempList,setTempList] = useState([])
  const [isBotLoading,setIsBotLoading] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();

      const handleClick = (newPlacement) => (event) => {
        console.log('wow')
        setIsChatbotInfoVisible(!isChatbotInfoVisible)
        setAnchorEl(event.currentTarget);
        setOpen(true);
        setPlacement(newPlacement);
    };

    const [messages, setMessages] = useState([
        { id: uuidv4(), text: "Hi there!", sender: "bot" },
        { id: uuidv4(), text: "How can I assist you today?", sender: "bot" },
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
            id:id,
            api: key
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
    
      const scrollBottom = (e) => {
        console.log('ohhhhhh')
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
    return(
        <>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{boxShadow:'none'}}>
        <ThemeProvider theme={customTheme}>
          {isChatbotInfoVisible&&(
          <div className="chatbox-container" style={{zIndex:9999,height:'550px',width:'320px',
          display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div className="chatbox-nav" style={{borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
          <Typography sx={{ color: 'white', marginLeft: '10px', fontSize:'17px'}}>
            Convo<span className="chatbox-span-1">Bot</span>
          </Typography>
          <IconButton
              aria-label="open menu"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick('top-end') }
              sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px'}}
            >
            <img style={{height:'20px',width:'20px',marginRight:'15px'}} src={minimizeImg} />
          </IconButton>

        </div>
        <Box
          sx={{
            paddingTop: '10px',
            height: "calc(100% - 80px )",
            width: "98%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
            borderBottomRightRadius:'20px',
            borderBottomLeftRadius:'20px',
          }}
        >
          <Box className="chatbox-messages-container" sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Box>
          <Box sx={{ backgroundColor: "background.default", display: 'flex',padding:'15px 3px 10px 3px',background:'none' }}>
            <TextField
            className="chatbox-container-textField"
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              sx={{
                background:'white'
              }}
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
      )}
    </ThemeProvider>
    </Paper>
                </Fade>
              )}
            </Popper>

        <Tooltip title="Tap to chat">
              <Button onClick={handleClick('top-end') } sx={{position:'fixed',right:'0',bottom:'0',margin:'0px 80px 30px 0px'}}>
                  <img src={logo} style={{height:'60px',width:'60px'}}/>
              </Button>
        </Tooltip>
        </>
    )
}

const Message = ({ message }) => {
    const isBot = message.sender === "bot";

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
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
              padding:'9px 14px' ,
              ml: isBot ? 1 : 0,
              mr: isBot ? 0 : 1,
              backgroundColor: isBot ? "primary.light" : "",
              borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '11px' }}>{message.text}</Typography>
          </Paper>
        </Box>
      </Box>
    );
  }