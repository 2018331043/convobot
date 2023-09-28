import '../styling/components/ChildSidebar.css'
import Typography from '@mui/material/Typography';


export default function ChildSiidebar({reportType,setReportType,openReport,chatActive,setChatActive,openWidget,setOpenWidget,
    selectedChatbot,openAdvanced,setOpenAdvanced}){

    const backStyle = {
        color:'rgba(255, 189, 6, 1)',
        background: 'rgba(255, 189, 6, 0.185)',
    }
    const TrainButtonClicked = ()=>{
        // console.log('no')
        setChatActive(false)
        setOpenWidget(false)
        setOpenAdvanced(false)
    }

    const ConversationButtonClicked = ()=>{
        setChatActive(true)
        setOpenWidget(false)
        setOpenAdvanced(false)
    }

    const PublishButtonClicked = ()=>{
        setChatActive(false)
        setOpenWidget(true)
        setOpenAdvanced(false)
    }
    const AdvanceButtonClicked = ()=>{
        setChatActive(false)
        setOpenWidget(false)
        setOpenAdvanced(true)
    }

    const chatbotReportClicked = ()=>{
        setReportType('chatbot')
    }

    const apiReportClicked = ()=>{
        setReportType('not-chatbot')
    }
    return(
        <>
            <div className='child-sidebar-body'>
                {
                    openReport?(<>
                         <Typography sx={reportType==='chatbot'?backStyle:null} onClick={chatbotReportClicked} className='child-item'>Chatbot</Typography>
                         <Typography sx={reportType!=='chatbot'?backStyle:null} onClick={apiReportClicked} className='child-item'>Api Key</Typography>
                    </>):
                    (<>
                        <Typography onClick={TrainButtonClicked} sx={!chatActive&&!openWidget&&!openAdvanced?backStyle:null} className='child-item'>Train</Typography>
                        {
                            selectedChatbot!==-3?(
                                <div>
                                <Typography onClick={ConversationButtonClicked} sx={chatActive?backStyle:null} className='child-item'>Conversation</Typography>
                                <Typography onClick={PublishButtonClicked} sx={openWidget?backStyle:null} className='child-item'>Publish</Typography>
                                <Typography onClick={AdvanceButtonClicked} sx={openAdvanced?backStyle:null} className='child-item'>Advanced</Typography>
                                </div>
                            ):(null)
                        }
                    </>)
                }
            </div>
        </>
    )
}