import '../styling/components/Advanced.css'
import '../styling/components/ChatbotInfo.css'
import logo from '../assets/bot.png'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
// import AssistantIcon from '@mui/icons-material/Assistant';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BlockIcon from '@mui/icons-material/Block';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
// import Tooltip from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import ChatBox from './Chatbox.jsx'
import { useEffect } from 'react';
import authService from '../services/auth.service.js';
import LoadingDialog from './LoadingDialog';
import displayToast from '../services/toast.service.js';
import chatService from '../services/chat.service';
import Divider from '@mui/material/Divider';
import LinkIcon from '@mui/icons-material/Link';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system'
import BuildIcon from '@mui/icons-material/Build';


export default function Advanced({
    selectedChatbot, setSelectedChatbot,
            selectedChatbotInfo, setChatBotList,
            openAdvanced, setOpenAdvanced
}){
    const [isLoading,setIsLoading] = useState(false)
    const [loadingTitle,setLoadingTitle] = useState('Loading')
    const [selectedModel, setSelectedModel] = useState('gpt-3');
    const [text,setText] = useState('')
    const [url,setUrl] = useState('')
    const [inputSize,setInputSize] = useState(400)

    const handleModelChange = (event) => {
      setSelectedModel(event.target.value);
    };

    useEffect(()=>{
        // console.log(selectedChatbotInfo)
    },[])
  
    return (
        <>
             <div className='chatbotInfo-body' style={{display:'flex',flexDirection:'column',
            alignItems:'center'}}>
                    <div className='chatbotInfo-body-head' style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',
                    borderBottom:'solid', borderBottomColor:'rgba(255, 189, 6, 0.849)'}}>
                        <Typography variant='h6' sx={{marginLeft:'30px',color:'rgba(255,255,255,1)',marginBottom:'0', display: 'flex', alignItems: 'center'}}>{selectedChatbotInfo.name}</Typography>
                    </div>
                    <div className='advanced-body-container'>
                        <Typography variant='h6' sx={{marginTop:'10px',fontWeight:'600'}}>Context Input</Typography>
                        <Typography sx={{marginTop:'10px'}}> Provide a text to let us know the context of the chatbot. </Typography>
                        <TextField
                        // className='chatbotInfo-body-container-textfield'
                        id="outlined-multiline-static"
                        label="Chatbot Context"
                        multiline
                        sx={{marginTop:'20px'}}
                        rows={11}
                        onChange={(e)=>{
                            setText(e.target.value)
                        }}
                        className="custom-scroll-style" 
                        // InputProps={{
                        //   startAdornment: (
                        //     // <InputAdornment position="start">
                        //     //   <IconButton>
                        //     //     <AdbIcon sx={{color:'rgba(0,0,0,.8)'}} />
                        //     //   </IconButton>
                        //     // </InputAdornment>
                        //   ),
                        // }}
                        />
                        <Button
                        variant="contained"
                        sx={{width:'fit-content',marginTop:'20px',marginLeft:'auto'}}
                        color="primary"
                        startIcon={<BuildIcon />} // Add the TrainIcon as a startIcon
                        // onClick={handleTrainClick}
                        >
                        Train
                        </Button>
                        
                        <Divider sx={{marginTop:'50px'}}/>
                        <Typography variant='h6' sx={{marginTop:'25px',fontWeight:'600'}}>Website Reference</Typography>
                        <Typography sx={{marginTop:'10px'}}> Provide a websiite link from which we can retrieve data to provide context for the chatbot. </Typography>
                        <TextField
                        sx={{marginTop:'20px'}}
                        label="URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>{
                            setUrl(e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                            <LinkIcon color="action" style={{ marginRight: '8px' }} />
                            ),
                        }}
                        />
                        <Button
                        variant="contained"
                        sx={{width:'fit-content',marginTop:'20px',marginLeft:'auto'}}
                        color="primary"
                        startIcon={<BuildIcon />} // Add the TrainIcon as a startIcon
                        // onClick={handleTrainClick}
                        >
                        Train
                        </Button>
                        <Divider sx={{marginTop:'50px'}}/>
                        <div style={{display:'flex',justifyContent:'flex-start',marginTop:'45px',marginBottom:'50px'}}>
                            <div style={{display:'flex',alignItems:'center'}}>
                            <Typography>Limit Input Size:</Typography>
                            <TextField
                            sx={{marginLeft:'15px'}}
                                label="Input Size"
                                variant="outlined"
                                value={400}
                                onChange={(e)=>{
                                    setInputSize(e.target.value)
                                }}
                                type="number"
                            />

                            </div>
                            <div style={{width:'140px',marginLeft:'200px'}}>
                            <FormControl fullWidth>
                            <InputLabel>Model</InputLabel>
                                <Select
                                    value={selectedModel}
                                    onChange={handleModelChange}
                                    label="Model"
                                >
                                    <MenuItem value="gpt-3">GPT-3</MenuItem>
                                    <MenuItem value="gpt-4">GPT-4</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                        </div>
                        {/* <Divider sx={{marginTop:'35px'}}/> */}
                        <Button variant='contained' size='string' className='chatbotInfo-body-footer-button' sx={{marginLeft:'auto',marginBottom:'40px'}}>
                            <SettingsSuggestIcon sx={{marginRight:'5px',marginBottom:'4px',paddingTop:'5px',
                            paddingBottom:'5px'}}/>REGenerate Chatbot</Button>
                    </div>
                </div>
                <LoadingDialog loadingAnimation={isLoading} title={loadingTitle}/>
        </>
    )
}