import '../styling/Dashboard.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ChatbotInfo from '../components/ChatbotInfo'

export default function Dashboard(){
    return (
        <div className="dashboard-body">
            <Sidebar/>
            <div className='dashboard-right'>
                <Navbar/>
                <ChatbotInfo/>
            </div>
        </div>
    )
}