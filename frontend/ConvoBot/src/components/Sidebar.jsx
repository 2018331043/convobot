import '../styling/components/Sidebar.css'
// import { useState } from 'react';
import logo from '../assets/bot.png'
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ChatName from './ChatName';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, forwardRef, useEffect} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import authService from '../services/Auth.Service';

export default function Sidebar(){
    const [openAddChatbot, setOpenAddChatbot] = useState(false);
    const [chatbotList,setChatBotList] = useState([])
    const [newChatbotName,setNewChatbotName] = useState("")
    const [newChatbotDescription,setNewChatbotDescription] = useState("")

        const handleClickOpen = () => {
            setOpenAddChatbot(true);
        };

        const handleClose = () => {
            setOpenAddChatbot(false);
        };
        const newChatbotButtonClicked = ()=>{
            if(newChatbotName!==""&&newChatbotDescription!==""){
                // console.log(newChatbotName)
                // console.log(newChatbotDescription)
                handleClose()
                setNewChatbotName('')
                setNewChatbotDescription('')
            }
        }

        const customTheme = createTheme({
            palette: {
              primary: {
                main: "rgb(255, 189, 6)", // Change this to your desired color
                // main: "rgb(0,0,0,.9)",
              },
              // You can also customize other colors like secondary, error, etc.
            },
          });

          useEffect(()=>{
            authService.getAllChatbots((res)=>{
                let list = res.data
                setChatBotList(list)
            },(err)=>{
                console.log(err)
            })
          },[])
    return (
        <div className="sidebar-body">
            <div className='sidebar-body-title'>
                <img src={logo} alt='logo'/>
                <Typography className='sidebar-body-title-name'>Convo<span className='sidebar-span-1'>Bot</span></Typography>
            </div>
            <div className='sidebar-body-chats'>
                <Typography className='sidebar-body-chats-title'>ALL CHATBOTS</Typography>
                <div className='sidebar-body-chats-container'>
                    {
                        chatbotList.map(item =>{
                            return (
                                <ChatName name={item.name} /> 
                            )
                        })
                    }
                </div>
                <div className='sidebar-body-addchat'>
                <Button variant="outlined" sx={{borderWidth:'1px'}} onClick={handleClickOpen} className='sidebar-body-addchat-button'>Add a Chatbot <AddIcon sx={{marginBottom:'1px',marginLeft:'5px'}}/></Button>
                </div>
            </div>
            <ThemeProvider theme={customTheme}>
            <Dialog open={openAddChatbot} onClose={handleClose} sx={{background:'rgba(255,255,255,.6)'}}>
                <DialogTitle sx={{background:'rgba(0,0,0,0.9)',color:'white',marginBottom:'20px'}} >Convo<span className='sidebar-span-1'>Bot</span></DialogTitle>
                <DialogContent>
                <DialogContentText sx={{marginBottom:'10px'}}> 
                    Let us know about your chatbot.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    multiline
                    fullWidth
                    minRows={1}
                    maxRows={1}
                    defaultValue=""
                    inputProps={{ maxLength: 25 }}
                    onChange={(e)=>{
                        setNewChatbotName(e.target.value)
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Short Description"
                    multiline
                    fullWidth
                    minRows={4}
                    maxRows={4}
                    defaultValue=""
                    onChange={(e)=>{
                        setNewChatbotDescription(e.target.value)
                    }}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={newChatbotButtonClicked}>Confirm</Button>
                </DialogActions>
            </Dialog>
            </ThemeProvider>
        </div>
    )
}