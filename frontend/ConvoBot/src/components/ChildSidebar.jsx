import '../styling/components/ChildSidebar.css'
import Typography from '@mui/material/Typography';


export default function ChildSiidebar({chatActive,setChatActive,openWidget,setOpenWidget,selectedChatbot}){

    const backStyle = {
        color:'rgba(219, 138, 17, 1)',
        background: 'rgba(219, 138, 17, 0.175)'
    }
    const TrainButtonClicked = ()=>{
        // console.log('no')
        setChatActive(false)
        setOpenWidget(false)
    }

    const ConversationButtonClicked = ()=>{
        setChatActive(true)
        setOpenWidget(false)
    }

    const PublishButtonClicked = ()=>{
        setChatActive(false)
        setOpenWidget(true)
    }
    return(
        <>
            <div className='child-sidebar-body'>
                <Typography onClick={TrainButtonClicked} sx={!chatActive&&!openWidget?backStyle:null} className='child-item'>Train</Typography>
                {
                    selectedChatbot!==-3?(
                        <div>
                        <Typography onClick={ConversationButtonClicked} sx={chatActive?backStyle:null} className='child-item'>Conversation</Typography>
                        <Typography onClick={PublishButtonClicked} sx={openWidget?backStyle:null} className='child-item'>Publish</Typography>
                        <Typography className='child-item'>Advanced</Typography>
                        </div>
                    ):(null)
                }
            </div>
        </>
    )
}