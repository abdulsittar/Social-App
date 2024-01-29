import {useState, useEffect} from 'react'
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Rightbar2 from "../../components/rightbar/Rightbar2";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useMediaQuery } from 'react-responsive';
import './home.css';

function Home() {
    const [selectedValue, setSelectedValue] = useState('0');

    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });

    return (
        <>
            <Topbar setSelectedValue={setSelectedValue}/>
            <div className="homeContainer" style={{ 'margin-top': !isMobileDevice && !isTabletDevice && '0px' }}>
                { isMobileDevice && isTabletDevice && <Sidebar />}
                <Feed selectedValue={selectedValue}/>
                { isMobileDevice && isTabletDevice && <Rightbar2 />}
            </div>
        </>
    )
}

export default Home
