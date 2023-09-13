import * as React from "react";
import { useState } from "react";
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

export default function Chatbox() {
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

  return (
    <ThemeProvider theme={customTheme}>
      <div className="chatbox-container">
        <div className="chatbox-nav">
          <Typography variant="h6" sx={{ color: 'white', marginLeft: '10px' }}>
            Convo<span className="chatbox-span-1">Bot</span>
          </Typography>
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
          <Box sx={{ p: 2, backgroundColor: "background.default", display: 'flex' }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              sx={{ width: '300px' }}
            />
            <Button
              className="chatbox-container-send-button"
              color="primary"
              variant="contained"
              onClick={handleSend}
              style={{ width: '30px', padding: '0px' }}
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
            p: 2,
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