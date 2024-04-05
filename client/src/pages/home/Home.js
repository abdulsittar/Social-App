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
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
    const [selectedValue, setSelectedValue] = useState('0');
    const [searchTerm, setSearchTerm] = useState("");
    const [shouldSendEvent, setShouldSendEvent] = useState(false);
    const [shouldSendAlert, setShouldSendAlert] = useState(true);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [day_One_Percent, setDay_One_Percent] = useState(0);
    const [day_Two_Percent, setDay_Two_Percent] = useState(0);
    const [day_Three_Percent, setDay_Three_Percent] = useState(0);
    const [day_Four_Percent, setDay_Four_Percent] = useState(0);
    const [day_Five_Percent, setDay_Five_Percent] = useState(0);

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

          if(shouldSendAlert){
            fetchTimeSpent();
          }
      
        }, []);

        const handleNotificationClick = () => {
          
          history.push(`/postsurvey/${currentUser.username}`);

        };


        

        const fetchTimeSpent = async () => {
  
            
            const res = await axios.get("/users/" + currentUser._id + "/getTimeSpent")
            console.log(res.data);
            const a = calculatePercentage(res.data["today"], 2)
            const b = calculatePercentage(res.data["oneDayBefore"], 2)
            const c = calculatePercentage(res.data["twoDayBefore"], 2)
            const d = calculatePercentage(res.data["threeDayBefore"], 2)
            const e = calculatePercentage(res.data["fourDayBefore"], 2)

            setDay_One_Percent(a);
            setDay_Two_Percent(b);
            setDay_Three_Percent(c);
            setDay_Four_Percent(d);
            setDay_Five_Percent(e);

            
               if(a > 50 && b > -1 && c > -1){
              
                    toast.success("Herzlichen Glückwunsch!!! Sie sind jetzt berechtigt, an der Nachbefragung teilzunehmen.",{onClick: handleNotificationClick});
                    
                    setShouldSendAlert(false)
                }
            
          };

          const calculatePercentage = (numerator, denominator) => {
            // Ensure denominator is not 0 to avoid division by zero error
            if (denominator !== 0) {
              const perct = (numerator/denominator) * 100
              console.log(numerator)
              console.log(denominator)
              console.log(perct)
              return (perct).toFixed(0);
            } else {
              return 'N/A';
            }
          };

    return (
        <>
        <ToastContainer autoClose={600000}></ToastContainer>
            <Topbar setSelectedValue={setSelectedValue} setSearchTerm={setSearchTerm}/>
            <ToastProvider style={{ 'margin': !isMobileDevice && !isTabletDevice && '0px 1px' }}>
            <div className="homeContainer" style={{ 'margin': !isMobileDevice && !isTabletDevice && '50px 1px' }}>
                { isMobileDevice && isTabletDevice && <Sidebar />}
                <Feed selectedValue={selectedValue} searchTerm={searchTerm} />
                {/* isMobileDevice && isTabletDevice && <Rightbar2 />*/}
            </div>
            </ToastProvider>
        </>
    )
}

export default Home
