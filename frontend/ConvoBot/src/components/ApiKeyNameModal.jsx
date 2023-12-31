import { createTheme, ThemeProvider } from "@mui/material/styles"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ApiKeyNameModal(openApiKeyNameModal,setOpenApiKeyNameModal){

    const handleClickOpen = () => {
        setOpenApiKeyNameModal(true)
    }

    const handleApiNameClose = () => {
        setOpenApiKeyNameModal(false)
    }

    const customTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(255, 189, 6)",
          },
        },
      });

    return (
        <>
        <ThemeProvider theme={customTheme}>
        <Dialog open={openApiKeyNameModal} onClose={handleApiNameClose} sx={{background:'rgba(255,255,255,.6)'}}>
            <DialogTitle sx={{zIndex:'1000',background:'rgba(0,0,0,0.9)',color:'white',marginBottom:'20px'}} >Convo<span className='sidebar-span-1'>Bot</span></DialogTitle>
            <DialogContent sx={{width:'500px',maxHeight:'50vh'}}>
            <DialogContentText sx={{marginBottom:'10px'}}> 
                The api key(s) you have already created:
            </DialogContentText>
            <div>
            </div>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
        </>
    )
}