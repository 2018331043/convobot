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
import React, { useState } from 'react';
import ChatBox from './Chatbox.jsx'
import { useEffect,useRef } from 'react';
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
import advancedOpenApiService from '../services/advance.open.ai.service.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'


export default function Advanced({
    selectedChatbot, setSelectedChatbot,
            selectedChatbotInfo, setChatBotList,
            openAdvanced, setOpenAdvanced
}){
    const [isLoading,setIsLoading] = useState(false)
    const [loadingTitle,setLoadingTitle] = useState('Loading')
    const [selectedModel, setSelectedModel] = useState('gpt-3');
    const [text,setText] = useState('')
    const [urlData,setUrlData] = useState('')
    const [inputSize,setInputSize] = useState(400)
    const [openName, setOpenName] = useState(false);
    const [contextName, setContextName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const containerRef = useRef(null)
    const [flag,setFlag] = useState(false)

    const [nameList,setNameList] = useState([
      
    ]);
  
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

        const handleClickOpen = () => {
            setOpenName(true);
        };

        const handleClose = () => {
            setOpenName(false);
        };


        const embeddingButtonClicked = ()=>{
            if(text===''){
                displayToast.error('Please provide some textual data to train.')
            }else{
                handleClickOpen()
            }
        }
        const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        };

        

        const handleContextNameChange = (event) => {
        setContextName(event.target.value);
        };
        
        const embeddingConfirmation = ()=>{
            setOpenName(false)
            if(contextName!==''){
                setIsLoading(true)
                setLoadingTitle('Context integration in progress')
                advancedOpenApiService.attachEmbedding(
                    (res)=>{
                        // console.log(res)
                        setTimeout(()=>{
                            setIsLoading(false)
                            setLoadingTitle('')
                            displayToast.success('Integration successfully completed.')
                            setFlag(!flag)
                        },1000)
                    },
                    (e)=>{
                        setTimeout(()=>{
                            setIsLoading(false)
                            setLoadingTitle('')
                            displayToast.error('Error occured!')
                        },1000)
                    },
                    {
                        id:selectedChatbot,
                        textInput:text,
                        name:contextName
                    }
                )
            }else{
                displayToast.info('Please Provide a title.')
            }
        }

        const websiteAttach = ()=>{
            console.log(urlData)
            console.log(selectedChatbot)
            if(urlData===''){
                displayToast.info('Please provide a url.')
            }else{
                setIsLoading(true)
                setLoadingTitle('Fetching data from the website in progress.')
                advancedOpenApiService.attachWebInfoToChatbot((res)=>{
                    console.log(res)
                    setTimeout(()=>{
                        setIsLoading(false)
                        setLoadingTitle('')
                        displayToast.success('Chatbot fetched data successfully')
                    },1000)
                },(e)=>{
                    setTimeout(()=>{
                        setIsLoading(false)
                        setLoadingTitle('')
                        displayToast.error('Error occured!')
                    },1000)
                },{
                    id:selectedChatbot,
                    url:urlData
                })
            }
        }
        useEffect(() => {
            const handleScroll = () => {
                setOpen(false);
            };
    
            const containerElement = containerRef.current;

            if (containerElement) {
                containerElement.addEventListener('scroll', handleScroll);
            }
    
            return () => {
                if (containerElement) {
                    containerElement.removeEventListener('scroll', handleScroll);
                }
            };
        }, [setOpen])

        useEffect(()=>{
            advancedOpenApiService.getAllEmbeddings((res)=>{
                setNameList(res)
            },(e)=>{

            },selectedChatbot)
        },[flag])

        const deleteItem = (e)=>{
            // console.log(e.embeddingName)
            // console.log(e.embeddingId)
            advancedOpenApiService.deleteEmbedding(
                (res)=>{
                    setFlag(!flag)
                    displayToast.info('Context deleted')
                },()=>{

                },
                e.embeddingId
            )
        }
    return (
        <>
             <div className='chatbotInfo-body' style={{display:'flex',flexDirection:'column',
            alignItems:'center'}}>
                    <div className='chatbotInfo-body-head' style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',
                    borderBottom:'solid', borderBottomColor:'rgba(255, 189, 6, 0.849)',zIndex:'999'}}>
                        <Typography variant='h6' sx={{marginLeft:'30px',color:'rgba(255,255,255,1)',marginBottom:'0', display: 'flex', alignItems: 'center'}}>{selectedChatbotInfo.name}</Typography>
                    </div>
                    <div className='advanced-body-container'  ref={containerRef}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'15px'}}>
                            <Typography variant='h6' sx={{fontWeight:'600'}}>Context Input</Typography>
                            <div>
                                <Button
                                    onClick={handleClick('bottom-end')}
                                    variant="outlined"
                                    startIcon={<ArrowDropDownIcon />}
                                >
                                    Previous Contexts
                                </Button>
                                <Popper open={open} anchorEl={anchorEl} placement={placement} transition  >
                                {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350} sx={{boxShadow:'none'}}>
                                    <Paper sx={{ maxHeight: '200px', overflowY: 'auto' }} >
                                    <MenuList
                                        sx={{ maxHeight: '500px', overflowY: 'auto',padding:'5px' }}
                                        >
                                    {nameList.map((name, index) => (
                                    <Tooltip key={index} title='Tap to delete'>
                                    
                                    <MenuItem value={name} onClick={()=>deleteItem(name)}  sx={{
                                        minWidth: '200px',
                                        justifyContent: 'flex-end',
                                        padding: '8px 16px', // Add padding for spacing
                                        borderRadius: '4px', // Add rounded corners
                                        margin: '4px 0', // Add margin between items
                                        cursor: 'pointer', // Change cursor on hover
                                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,.1)', // Change background color on hover
                                        },
                                    }}>
                                    <Typography>{name.embeddingName} ({name.embeddingLength})</Typography>
                                    </MenuItem>
                                    </Tooltip>
                                    ))}
                                     </MenuList>
                                    </Paper>
                                </Fade>
                                )}
                            </Popper>
                                </div>                
                        </div>
                        <Typography sx={{marginTop:'10px'}}> You can provide a textual data to <b>train</b> your chatbot. Your chatbot will be able to use these data as a context to answer user's queries. Note that this data can be very large textual data. </Typography>
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
                        onClick={embeddingButtonClicked}
                        startIcon={<BuildIcon />} // Add the TrainIcon as a startIcon
                        // onClick={handleTrainClick}
                        >
                        Train
                        </Button>
                        
                        <Divider sx={{marginTop:'50px'}}/>
                        <Typography variant='h6' sx={{marginTop:'25px',fontWeight:'600'}}>Website Reference</Typography>
                        <Typography sx={{marginTop:'10px'}}> Add your or any other website url to your chatbot. Your chatbot will be able to map the provided website automatically and answer any questions with data from that website. </Typography>
                        <TextField
                        sx={{marginTop:'20px'}}
                        label="URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>{
                            setUrlData(e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                            <LinkIcon color="action" style={{ marginRight: '8px' }} />
                            ),
                        }}
                        />
                        <Button
                        variant="contained"
                        onClick={websiteAttach}
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

                {/* Dialog for embedding name */}
                <Dialog
                    open={openName}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Please provide a title for the context"}
                    </DialogTitle>
                    <DialogContent sx={{width:'450px'}}>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            label="title"
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 20 }}
                            value={contextName}
                            onChange={handleContextNameChange}
                            />
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={embeddingConfirmation} autoFocus>
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
                <LoadingDialog loadingAnimation={isLoading} title={loadingTitle}/>
        </>
    )
}