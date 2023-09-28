import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import authService from "../services/auth.service.js";
import {useEffect, useState} from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
const columns = [
    {
        field: 'SL',
        headerName: 'SL',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 60,
        valueGetter: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id)+1,
    },
    { field: 'id', headerName: 'ID', width: 60 },
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
const columnsApiKey = [
    {
        field: 'SL',
        headerName: 'SL',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 70,
        valueGetter: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id)+1,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'apiKeyName', headerName: 'ApiKey Name', width: 140 },
    { field: 'value', headerName: 'Value', width: 300 },
    {
        field: 'totalInputTokensSoFar',
        headerName: 'Input Tokens Used',
        type: 'number',
        width: 200,
    },
    {
        field: 'totalOutputTokensSoFar',
        headerName: 'Output Tokens Used',
        type: 'number',
        width: 200,
    },
    {
        field: 'totalTokensSoFar',
        headerName: 'Total Tokens Used',
        type: 'number',
        width: 200,
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
    },
});
const backButtonClicked = () =>{
    // setOpenWidget(false)
    console.log("hello world")
}
const chartSetting = {
    yAxis: [
        {
            label: 'Tokens',
        },
    ],
    width: 1000,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'rotate(-90deg) translate(0px, -20px)',
        },
        '--ChartsLegend-itemWidth': '200px',
    },
    colors:[
        '#000000',
        '#f28e2c',
        '#e15759']
};
export default function DetailedReport({reportType}) {
    const [chatbotListForReport,setChatbotListForReport] = useState([{id:20,chatbotName:"Yoga Instructor",prompt:"You are my personal asisstant who answers question about my current research works","restrictions":"- Do not answer any questions out of the topic.\n\n- Be brief and  precise with your answers","description":"A yoga instructor chatbot","totalInputTokensSoFar":0,"totalOutputTokensSoFar":0,"totalTokensSoFar":0}])
     const [apiKeyListForReport,setApiKeyListForReport] = useState(rows)
   

    useEffect(()=>{
        authService.getAllChatbotReport((res)=>{
            let list = res.data
            setChatbotListForReport(list)
        },(err)=>{
            console.log(err)
        })

    },[])
    useEffect(()=>{
        authService.getAllApiKeyReport((res)=>{
            let list = res.data
            setApiKeyListForReport(list)
        },(err)=>{
            console.log(err)
        })
    },[])
   
    
    return (
    <div className="chatbox-container" style={{zIndex:1000}}>
        <div className="chatbox-nav" style={{borderTopRightRadius:'13px',borderTopLeftRadius:'13px',borderBottom:'solid',
            borderBottomColor:'rgba(255, 189, 6, 0.849)'}}>
            <Typography variant="h6" sx={{ color: 'white', marginLeft: '30px', fontSize:'17px'}}>
                {reportType === 'chatbot'? 'Chatbot Report':'Api Key Report'}
            </Typography>

        </div>
        <ThemeProvider theme={customTheme}>
            {reportType === 'chatbot'? <div style={{ overflow:'auto', height: '80%', width: '100%',display:"flex",flexDirection:"column", marginTop:"20px"}}>
                <div style={{ height: '80%', width: '100%',display:"flex",flexDirection:"row", marginTop:"20px"}}>
                    <BarChart
                        dataset={chatbotListForReport}
                        xAxis={[{ scaleType: 'band', dataKey: 'chatbotName' }]}
                        series={[
                            { dataKey: 'totalInputTokensSoFar', label: 'Input Tokens'},
                            { dataKey: 'totalOutputTokensSoFar', label: 'Output Tokens'},
                            { dataKey: 'totalTokensSoFar', label: 'Total Tokens'},
                        ]}
                        {...chartSetting}
                    />
                </div>
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
            </div>:<div style={{ overflow:'auto', height: '80%', width: '100%',display:"flex",flexDirection:"column", marginTop:"20px"}}>
                <div style={{ height: '80%', width: '100%',display:"flex",flexDirection:"row", marginTop:"20px"}}>
                    <BarChart
                        dataset={apiKeyListForReport}
                        xAxis={[{ scaleType: 'band', dataKey: 'apiKeyName' }]}
                        series={[
                            { dataKey: 'totalInputTokensSoFar', label: 'Input Tokens'},
                            { dataKey: 'totalOutputTokensSoFar', label: 'Output Tokens'},
                            { dataKey: 'totalTokensSoFar', label: 'Total Tokens'},
                        ]}
                        {...chartSetting}
                    />
                </div>
                <div>
                    <DataGrid
                        rows={apiKeyListForReport}
                        columns={columnsApiKey}
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
            </div>}
        </ThemeProvider>
    </div>
    );
}