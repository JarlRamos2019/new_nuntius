import {useState, useEffect, useRef} from "react";
import Navbar from "../components/Navbar.jsx";

export default function Chatroom({messages, userInfo, session, sessionName}) {

    //const formData = useRef(null);
    
    const [messageUnit, setMessageUnit] = useState([]);

    useEffect(() => {
        // Ono Chatroom
        show_the_messages();
    }, []);
    
    async function show_the_messages() {
        // call backend API here...
    }
    
    async function send_message(msg) {
        // call backend API here...
    }
    
    function display_messages() {
        return (
            <div className="container-fluid">
                <ul className="series-of-messages">
                    {messages.map((msg, index) => (
                        <li className="message-entry container-fluid">
                            <div className="individual-msg" key={index}>
                                <p className="the-timestamp">{msg.timestamp}</p>
                                <p className="the-nickname">{msg.nickname}</p>
                                <p className="the-content">{msg.content}</p>
                            </div>    
                        </li>   
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <> 
            <Navbar/>
            <div className="msg-panel">
                <h2 className="session-name">{sessionName}</h2>
                <p className="session-id">Session ID: {session}</p>
                
                {messages ? display_messages() : "Ono Chatroom"}
                <form>
                    <textarea name="msg" 
                            type="message" 
                            id="msg-textarea" 
                            onChange={(event) => {
                                setMessageUnit(event.target.value)
                            }}
                    />
                    <div className="button-spacer"/>
                    <button id="the-send-msg-button" onClick={send_message()}>Send</button>
                </form>
            </div>        
        </>
    )
}








