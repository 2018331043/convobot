import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ApiList from "./ApiList.jsx";
import apiKeyService from "../services/api.key.service.js";
import displayToast from "../services/toast.service.js";
import TextField from '@mui/material/TextField';
import LoadingDialog from "./LoadingDialog.jsx";

export default function UserApiKeys({listItems, setListItems, openApiKeys, setOpenApiKeys }) {
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false); // New state for the generate API key dialog
  const [apiName,setApiName] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [loadingTitle,setLoadingTitle] = useState('')

  const handleClickOpen = () => {
    setOpenApiKeys(true);
  };

  const handleClose = () => {
    setOpenApiKeys(false);
  };

  const handleGenerateDialogOpen = () => {
    setOpenGenerateDialog(true);
  };

  const handleGenerateDialogClose = () => {
    setOpenGenerateDialog(false);
  };

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 189, 6)",
      },
    },
  });

  const generateApiKeyClicked = () => {
    // Show the generate API key dialog when the button is clicked
    handleGenerateDialogOpen();
  };

  useEffect(() => {
    apiKeyService.getApiKeys(
      (res) => {
        setListItems(res);
      },
      (e) => {}
    );
  }, []);

  const createApi = () =>{
    if(apiName===''){
      displayToast.warning('Please provide a Api name')
    }else{
      handleGenerateDialogClose()
      setIsLoading(true)
      setLoadingTitle('API creation in prgress')
      apiKeyService.generateApiKey((res) =>{
        apiKeyService.getApiKeys(
            (res)=>{
                setTimeout(()=>{
                  setListItems(res)
                  setIsLoading(false)
                  displayToast.success('Api successfully created')
                },2000)
            },
            (e)=>{
              setIsLoading(false)
            }
        )
        },(e)=>{
            displayToast.error('Error occurred')
            setIsLoading(false)
    },{
      apikeyName:apiName
    })
    }
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Dialog open={openApiKeys} onClose={handleClose} sx={{ background: "rgba(255,255,255,.6)" }}>
          <DialogTitle sx={{ zIndex: "1000", background: "rgba(0,0,0,0.9)", color: "white", marginBottom: "20px" }}>
            Convo<span className="sidebar-span-1">Bot</span>
          </DialogTitle>
          <DialogContent sx={{ width: "550px", maxHeight: "50vh" }}>
            <DialogContentText sx={{ marginBottom: "10px" }}>
              The API key(s) you have already created:
            </DialogContentText>
            <div>
              <ApiList listItems={listItems} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={generateApiKeyClicked} variant="contained" fullWidth>
              Generate New API Key
            </Button>
          </DialogActions>
        </Dialog>

        {/* Generate API Key Dialog */}
        <Dialog open={openGenerateDialog} onClose={handleGenerateDialogClose} sx={{ background: "rgba(255,255,255,.6)" }}>
          <DialogTitle>API Key Name</DialogTitle>
          <DialogContent sx={{width:'350px'}}>
          <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    multiline
                    fullWidth
                    minRows={1}
                    maxRows={1}
                    defaultValue=""
                    inputProps={{ maxLength: 20 }}
                    onChange={(e)=>{
                      setApiName(e.target.value)
                  }}
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGenerateDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={createApi}  color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      <LoadingDialog loadingAnimation={isLoading} title={loadingTitle}/>
    </>
  );
}
