import {useState, useEffect, useRef} from "react";

export default function Chatroom({messages, userInfo, session, sessionName}) {

    //const formData = useRef(null);
    
    const [messageUnit, setMessageUnit] = useState([]);

    useEffect(() => {
        // Ono Chatroom
        show_the_messages();
    }, []);
    
    /*
    useEffect(() => {
        console.log(messageUnit);
        send_message();
    }, [messageUnit]);
    */
    
    async function show_the_messages() {
        /*
        try {
            const response = await axios.post("http://localhost:4000/api/fetch-posts", {
                sessionID: session
            });
    
            if (response) {
                const messageData = response.data.messageData.map((item) => ({
                    userID: item.userID,
                    nickname: item.nickname,
                    avatar: item.avatar,
                    content: item.content,
                    type: 'text',
                    timestamp: item.timestamp
                }))
                //setMessages(messageData);
                console.log("Messages have been successfully retrieved");
            } else console.log("Messages have not been retrieved");
    
        } catch (error) {
            console.error("Error retrieving messages: " + error);
        } 
        */
    }
    
    async function send_message(msg) {
        /*
        try {
            const response = await axios.post("http://localhost:4000/api/create-new-post", {
                sessionID: session,
                userID: userInfo.userID,
                avatar: userInfo.avatar,
                content: msg,
                type: "text"
            })
            if (response) console.log("The message has been successfully created.");
            else console.log("The message was not created.");
    
        } catch (error) {
            console.error("Error creating message: " + error);
        }
        */
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
                    <button id="the-button" onClick={send_message("foo")}>Send</button>
                </form>
            </div>        
        </>
    )
}








