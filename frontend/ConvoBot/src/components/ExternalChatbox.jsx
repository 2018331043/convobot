import logo from '../assets/bot.png'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
// import AssistantIcon from '@mui/icons-material/Assistant';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
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

export default function ExternalChatbox(){

  const [isChatbotInfoVisible, setIsChatbotInfoVisible] = useState(true);
  const handleMinimizeClick = () => {
    setIsChatbotInfoVisible((prev) => !prev);
  };

    const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();

      const handleClick = (newPlacement) => (event) => {
        setIsChatbotInfoVisible(!isChatbotInfoVisible)
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there!", sender: "bot" },
        { id: 2, text: "Hello!", sender: "user" },
        { id: 3, text: "How can I assist you today?", sender: "bot" },
      ]);
    
      const [input, setInput] = useState("");
    
      const handleSend = () => {
        if (input.trim() !== "") {
          console.log(input);
          const newMessage = { id: uuidv4(), text: input, sender: "user" };
          setMessages([...messages, newMessage]); // Create a new array with the existing messages and the new message
          setInput("");
        }
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
    return(
        <>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
        <ThemeProvider theme={customTheme}>
          {isChatbotInfoVisible&&(
          <div className="chatbox-container" style={{zIndex:9999}}>
          <div className="chatbox-nav">
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
            height: "calc(100% - 60px )",
            width: "98%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
          }}
        >
          <Box className="chatbox-messages-container" sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Box>
          <Box sx={{ backgroundColor: "background.default", display: 'flex',padding:'15px 3px 10px 3px' }}>
            <TextField
            className="chatbox-container-textField"
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
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
              <Button onClick={handleClick('top-end') } sx={{position:'fixed',right:'0',bottom:'0',margin:'0px 120px 80px 0px'}}>
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