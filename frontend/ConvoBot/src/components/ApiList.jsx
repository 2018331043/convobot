import React, { useState } from 'react';
import { Button, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Paper } from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import ApiIcon from '@mui/icons-material/Api';

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">API Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Key</Typography></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ApiIcon sx={{ marginRight: '10px', color: 'rgb(255, 189, 6)' }} />
                    {item.name}
                  </div>
                </TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  <Tooltip title="Copy">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<FileCopy sx={{ color: 'rgba(0,0,0,.6)',marginLeft:'12px' }} />}
                      onClick={() => handleCopyClick(item.value)}
                    ></Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </div>
  );
};

export default TextListWithCopy;