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

    const token = localStorage.getItem('token');
    const handleActivityRecorder = () => {
        axios.put("/users/" + currentUser._id + "/activity", { page: "Home", seconds: TimeMe.getTimeOnCurrentPageInSeconds(), headers: { 'auth-token': token } });
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
          const token = localStorage.getItem('token');
            const res = await axios.get("/users/" + currentUser._id + "/getTimeSpent", {headers: { 'auth-token': token }})
            console.log(res.data);
           setDay_One_Percent(calculatePercentage(res.data["today"], 16));
           setDay_Two_Percent(calculatePercentage(res.data["oneDayBefore"], 16));
           setDay_Three_Percent(calculatePercentage(res.data["twoDayBefore"], 16));
           setDay_Four_Percent(calculatePercentage(res.data["threeDayBefore"], 16));
           setDay_Five_Percent(calculatePercentage(res.data["fourDayBefore"], 1+));

            
               if(day_One_Percent> 50 && day_Two_Percent > 50 && day_Three_Percent > 50){
              
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
