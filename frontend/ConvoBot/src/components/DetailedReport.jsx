import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import authService from "../services/auth.service.js";
import {useEffect, useState} from "react";
const columns = [
    {
        field: 'SL',
        headerName: 'SL',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id)+1,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'chatbotName', headerName: 'Chatbot Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'prompt', headerName: 'Prompt', width: 400 },
    { field: 'restrictions', headerName: 'Restrictions', width: 200 },
    {
        field: 'totalInputTokensSoFar',
        headerName: 'Input Tokens Used',
        type: 'number',
        width: 100,
    },
    {
        field: 'totalOutputTokensSoFar',
        headerName: 'Output Tokens Used',
        type: 'number',
        width: 90,
    },
    {
        field: 'totalTokensSoFar',
        headerName: 'Total Tokens Used',
        type: 'number',
        width: 90,
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const customTheme = createTheme({
    palette: {
        primary: {
            main: "rgb(255, 189, 6)", // Change this to your desired color
        },
        // You can also customize other colors like secondary, error, etc.
    },
});
const backButtonClicked = () =>{
    // setOpenWidget(false)
    console.log("hello world")
}
export default function DetailedReport() {
    useEffect(()=>{
        authService.getAllChatbotReport((res)=>{
            let list = res.data
            setChatbotListForReport(list)
            // console.log(list)
            // setChatBotList(list)
        },(err)=>{
            console.log(err)
        })

    },[])
    const [chatbotListForReport,setChatbotListForReport] = useState(rows)
    return (
    <div className="chatbox-container" style={{zIndex:1000}}>
        <div className="chatbox-nav" style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',borderBottom:'solid',
            borderBottomColor:'rgba(255, 189, 6, 0.849)'}}>
            <Typography variant="h6" sx={{ color: 'white', marginLeft: '30px', fontSize:'17px'}}>
                Chatbot Report
            </Typography>
            <IconButton
                aria-label="open menu"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={backButtonClicked}
                sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',width:'40px'}}
            >
                <ArrowBackIcon sx={{color:'white',marginRight:'20px',paddingLeft:'10px'}}/>
            </IconButton>

        </div>
        <ThemeProvider theme={customTheme}>
            <div style={{ height: '80%', width: '100%',display:"flex",justifyContent:"center", marginTop:"20px"}}>
                <div>
                    <DataGrid
                        rows={chatbotListForReport}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        rowHeight={100}
                    />
                </div>
            </div>
        </ThemeProvider>
    </div>
    );
}