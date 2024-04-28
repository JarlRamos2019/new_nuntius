import "./App.css";
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chatroom from "./pages/Chatroom.jsx";

export default function App() {

    const [messages, setMessages] = useState([
        {
            userID: 1001,
            nickname: "nicolette1",
            avatar: 2,
            content: "What's for dinner? Pizza or KBBQ?",
            type: 'text',
            timestamp: 1714261557000

        },
        {
            userID: 1002,
            nickname: "Ringo334",
            avatar: 3,
            content: "I actually want some ramen tonight",
            type: 'text',
            timestamp: 1714261822000

        },
        {
            userID: 1003,
            nickname: "mariya85",
            avatar: 8,
            content: "I want ramen as well",
            type: 'text',
            timestamp: 1714261892000

        }
                    
    ]);
    const [userInfo, setUserInfo] = useState([
        {
            username: "nicolette1",
            userID: "123abc",
            avatar: 5
        }
    ]);
    const [session, setSession] = useState(12345);
    const [sessionName, setSessionName] = useState("RSU Class of 2024");

    
 
    return (
        <BrowserRouter>
            <div className="App">          
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="chatroom" element={<Chatroom messages={messages} 
                                                              userInfo={userInfo} 
                                                              session={session} 
                                                              sessionName={sessionName}/>}/>
                </Routes>
            </div>

        </BrowserRouter>  
    )

}