import {useState, useEffect, useRef} from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

export default function Chatroom({messages, setMessages, session, sessionName}) {

    const formData = useRef(null);
    
    //const [messages, setMessages] = useState([]);

    useEffect(() => {
        get_the_messages();
    }, []);
    
    async function get_the_messages() {
        try { 
            const response = await axios.post("http://localhost:4000/api/fetch-posts", {
                sessionID: sessionStorage.getItem("sessID")
            });

            const formattedMsgs = response.data.map((item) => ({
                timestamp: item.timestamp,
                nickname: item.nickname,
                content: item.content
            }));

            setMessages(formattedMsgs);

            if (formattedMsgs) {
                console.log("Messages successfully fetched");
            } else {
                console.log("Messages not fetched");
            }
        } catch (error) {
            console.error("Error fetching messages: " + error);
        }  
    }
    
    async function send_message() {
        try {
            const response = await axios.post("http://localhost:4000/api/create-new-post", {
                sessionID: sessionStorage.getItem("sessID"),
                nickname: sessionStorage.getItem("userNickname"),
                avatar: sessionStorage.getItem("userAvatar"),
                content: formData.current.msg.value, 
                type: 'text'
            });

            if (response) {
                console.log("Message successfully sent");
            } else {
                console.log("message not sent");
            }

        } catch (error) {
            console.error("Error sending the message: " + error);
        }   
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
                              ref={formData}
                    />
                    <div className="button-spacer"/>
                    <button id="the-send-msg-button" onClick={send_message()}>Send</button>
                </form>
            </div>        
        </>
    )
}








