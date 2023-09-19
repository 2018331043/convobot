import { useState,useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ApiList from './ApiList.jsx'
import apiKeyService from "../services/api.key.service.js";
import displayToast from "../services/toast.service.js";

export default function UserApiKeys({openApiKeys,setOpenApiKeys}){

    const [listItems,setListItems] = useState([])
    const textItems = ['Item 1', 'Item 2', 'Item 3'];

    const handleClickOpen = () => {
        setOpenApiKeys(true)
    }

    const handleClose = () => {
        setOpenApiKeys(false)
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

      const generateApiKeyClicked = () => {
        apiKeyService.generateApiKey((res) =>{
            displayToast.success('Api successfully created')
                
            apiKeyService.getApiKeys(
                (res)=>{
                    setListItems(res)
                },
                (e)=>{

                }
            )
            },(e)=>{
                displayToast.error('Error occurred')
        })
      }

      useEffect(()=>{
        apiKeyService.getApiKeys(
            (res)=>{
                setListItems(res)
            },
            (e)=>{
    
            }
        )
      },[])
    return (
        <>
        <ThemeProvider theme={customTheme}>
        <Dialog open={openApiKeys} onClose={handleClose} sx={{background:'rgba(255,255,255,.6)'}}>
            <DialogTitle sx={{zIndex:'1000',background:'rgba(0,0,0,0.9)',color:'white',marginBottom:'20px'}} >Convo<span className='sidebar-span-1'>Bot</span></DialogTitle>
            <DialogContent sx={{width:'500px',maxHeight:'50vh'}}>
            <DialogContentText sx={{marginBottom:'10px'}}> 
                The api key(s) you have already created:
            </DialogContentText>
            <div>
            <ApiList listItems={listItems} />
            </div>
            </DialogContent>
            <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button onClick={generateApiKeyClicked} variant="contained" fullWidth>Generate New Api Key</Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
        </>
    )
}