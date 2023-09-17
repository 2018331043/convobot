import {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingDialog({loadingAnimation,title}){

  const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      useEffect(()=>{
          setOpen(loadingAnimation)
      },[loadingAnimation])

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', width:'100%' }}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
          <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'400px' }}>
          <CircularProgress sx={{margin:'20px 20px 20px 20px'}} />
          <Typography variant="body1" color="textSecondary" style={{ marginLeft: 16 }}>
            Please Wait...
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
} 