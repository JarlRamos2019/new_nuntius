import {useState, useEffect, useRef} from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

export default function Chatroom({
    sessionName, 
    setSessionName,
    newSession,
    setNewSession}) {

    const formData =  {
        msg: useRef(null)
    }

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [session, setSession] = useState();

    useEffect(() => {
        console.log("========> useEffect 1 has ran");
        setSession(sessionStorage.getItem("sessID"));
        console.log("new session in useEffect 1 is: " + newSession);
        console.log("sessionStorage is: " + sessionStorage.getItem("sessID"));
        setSessionName(sessionStorage.getItem("sessName")); 
    }, [newSession]);

    useEffect(() => {
        console.log("========> useEffect 2 has ran");
        console.log("current session is: " + session);
        console.log("new session is: " + newSession);
        get_the_messages();
    }, [session]);
    
    useEffect(() => {
        console.log("========> useEffect 3 has ran");
        get_the_messages();
    }, [newMessage]);
    
    const get_the_messages = async () => {
        console.log("We got the messages!!!!!");
        console.log("get_the_messages: session ID is " + session);

        try { 
            const response = await axios.post("http://localhost:4000/api/fetch-posts", {
                sessionID: session
            });

            console.log("Chatroom: response is: " + JSON.stringify(response));

            const formattedMsgs = response.data.messageData.map((item) => ({
                timestamp: item.timestamp,
                nickname: item.nickname,
                content: item.content
            }));

            // this stops all async calls to get_the_messages that contain the
            // wrong session ID
            console.log("get_the_messages");
            console.log("session is: " + session);
            console.log("newSession is: " + newSession);
            if (!session) {

                console.log("Returning from function...");
                return;
            }

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

    const handleSubmit = async (e) => {
        //e.preventDefault();
    }    

    async function send_message() {
        try {
            const targetMessage = {
                sessionID: sessionStorage.getItem("sessID"),
                nickname: sessionStorage.getItem("userNickname"),
                avatar: sessionStorage.getItem("userAvatar"),
                content: formData.msg.current.value, 
                type: 'text'
            }

            setNewMessage(targetMessage);

            const response = await axios.post("http://localhost:4000/api/create-new-post", {
                sessionID: sessionStorage.getItem("sessID"),
                nickname: sessionStorage.getItem("userNickname"),
                avatar: sessionStorage.getItem("userAvatar"),
                content: formData.msg.current.value, 
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
    
    async function send_message_through_socket() {

    }


    function display_messages() {
        return (
            <div className="container-fluid">
                <ul className="series-of-messages">
                    {messages.map((msg, index) => (
                        <li className="message-entry container-fluid">
                            <div className="individual-msg" key={index}>
                                <p className="the-timestamp">{format_timestring(msg.timestamp)}</p>
                                <p className="the-nickname">{msg.nickname}</p>
                                <p className="the-content">{msg.content}</p>
                            </div>    
                        </li>   
                    ))}
                </ul>
            </div>
        )
    }

    function format_timestring(timestamp) {
        const date = new Date(timestamp);
        const dateComponent = date.toLocaleDateString("en-US");
        const timeComponent = date.toLocaleTimeString("en-US");
        return dateComponent.concat(" ", timeComponent);
    }

    return (
        <>
            <Navbar setSession={setSession} setNewSession={setNewSession}/>
            <div className="msg-panel">
                <h2 className="session-name">{sessionName}</h2>
                <p className="session-id">Session ID: {session}</p>
                
                {messages ? display_messages() : ""}
                <form onSubmit={handleSubmit}>
                    <textarea name="msg" 
                              type="message" 
                              id="msg-textarea"
                              ref={formData.msg}
                    />
                    <div className="button-spacer"/>
                    <button id="the-send-msg-button" onClick={() => send_message()}>Send</button>
                </form>
            </div>        
        </>
    )
}








