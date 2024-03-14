import React from 'react';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Rightbar2 from "../../components/rightbar/Rightbar2";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useMediaQuery } from 'react-responsive';
import {regSw, subscribe} from '../../helper.js';
import './home.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import TimeMe from "timeme.js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
    const [selectedValue, setSelectedValue] = useState('0');
    const [searchTerm, setSearchTerm] = useState("");
    const [shouldSendEvent, setShouldSendEvent] = useState(false);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });

    //console.log(TimeMe.getTimeOnCurrentPageInSeconds());

    const handleActivityRecorder = () => {
        axios.put("/users/" + currentUser._id + "/activity", { page: "Home", seconds: TimeMe.getTimeOnCurrentPageInSeconds() });
    };

    useEffect(() => {
        TimeMe.initialize({
          currentPageName: "HomePage", // current page
          idleTimeoutInSeconds: 10 // seconds
          });
      
          TimeMe.callWhenUserLeaves(() => {
          setShouldSendEvent(true);
          handleActivityRecorder();
          });
        
          TimeMe.callWhenUserReturns(() => {
          setShouldSendEvent(false);
          });
      
        }, []);


    return (
        <>
            <Topbar setSelectedValue={setSelectedValue} setSearchTerm={setSearchTerm}/>
            <ToastProvider style={{ 'margin': !isMobileDevice && !isTabletDevice && '0px 1px' }}>
            <div className="homeContainer" style={{ 'margin': !isMobileDevice && !isTabletDevice && '50px 1px' }}>
                { isMobileDevice && isTabletDevice && <Sidebar />}
                <Feed selectedValue={selectedValue} searchTerm={searchTerm} />
                { isMobileDevice && isTabletDevice && <Rightbar2 />}
            </div>
            </ToastProvider>
        </>
    )
}

export default Home
