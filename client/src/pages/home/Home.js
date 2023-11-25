import {useState, useEffect} from 'react'
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Rightbar2 from "../../components/rightbar/Rightbar2";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import './home.css';

function Home() {

    
    const [selectedValue, setSelectedValue] = useState('0');


    return (
        <>
            <Topbar setSelectedValue={setSelectedValue}/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed selectedValue={selectedValue}/>
                <Rightbar2/>
            </div>
        </>
    )
}

export default Home
