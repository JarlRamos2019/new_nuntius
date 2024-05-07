import "./App.css";
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chatroom from "./pages/Chatroom.jsx";

export default function App() {

    const [newSession, setNewSession] = useState();
    const [messages, setMessages] = useState([]);
    const [session, setSession] = useState(0);
    const [sessionName, setSessionName] = useState('');
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
       console.log(session);
    }, []);


    return (
        <BrowserRouter>
            <div className="App">         
                <Routes>
                    <Route index element={<Home newSession={newSession} 
                                                setNewSession={setNewSession}/>}/>
                    <Route path="chatroom" element={<Chatroom messages={messages}
                                                              setMessages={setMessages} 
                                                              userInfo={userInfo} 
                                                              session={session} 
                                                              setSession={setSession}
                                                              sessionName={sessionName}
                                                              setSessionName={setSessionName}
                                                              newSession={newSession}
                                                              setNewSession={setNewSession}/>}/>
                </Routes>
            </div>

        </BrowserRouter>  
    )

}