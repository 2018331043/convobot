import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import Tooltip from '@mui/material/Tooltip';
import '../styling/components/ApiList.css'

const TextListWithCopy = ({ listItems }) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage('Copied to clipboard');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <List>
        {listItems.map((item) => (
          <ListItem className='api-list-body' sx={{padding:'10px',marginBottom:'10px'}} key={item.id}>
            <ApiIcon sx={{marginRight:'15px',color:'rgb(255, 189, 6)'}}/>
            <ListItemText primary={item.value} />
            <Tooltip title="Copy">
            <Button sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
              variant="text"
              color="primary"
              startIcon={<FileCopy sx={{color:'rgba(0,0,0,.6)'}} />}
              onClick={() => handleCopyClick(item.value)}
            >
            </Button>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default TextListWithCopy;
