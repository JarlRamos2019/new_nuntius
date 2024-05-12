import NuntiusLogo from "../images/nuntius_logo.png";
import {useState, useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Home({newSession, setNewSession}) {

    const formData = {
        sessionName: useRef(null),
        nickname: useRef(null),
        joinSessionID: useRef(null),
        joinNickname: useRef(null),
        deleteSessionID: useRef(null)
    };

    const [newClicked, setNewClicked] = useState(false);
    const [joinClicked, setJoinClicked] = useState(false);
    const dummy = "Nicolette";

    async function establishSession() {
        try {
            const response = await axios.post("http://localhost:4000/api/create-session", {
                nickname: formData.nickname.current.value,
                sessionName: formData.sessionName.current.value
            });

            if (response) {
                console.log("Session successfully established");
                sessionStorage.setItem("userNickname", response.data.nickname);
                sessionStorage.setItem("sessID", response.data.sessionID);
                sessionStorage.setItem("userAvatar", response.data.avatar);
                sessionStorage.setItem("sessName", response.data.sessionName);
                setNewSession(sessionStorage.getItem("sessID"));
            } else console.error("Failed to insert new session");
            
            /*
            const response1 = await axios.post("http://localhost:4000/api/fetch-posts", {
                sessionID: response.data.sessionID
            });

            console.log("Home: response is: " + JSON.stringify(response1));

            const formattedMsgs = response1.data.messageData.map((item) => ({
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
            */

        } catch (error) {
            console.error("Error creating session: " + error);
        }  

    }

    async function enterSession() {
        try {
            console.log("Home: enter session");
            const response = await axios.post("http://localhost:4000/api/join-session", {
                sessionID: formData.joinSessionID.current.value,
                nickname: formData.joinNickname.current.value
            });

            if (!response) console.log("Server not found");
            else {
                console.log("Successfully entered session");
                sessionStorage.setItem("userNickname", response.data.nickname);
                sessionStorage.setItem("sessID", response.data.sessionID);
                sessionStorage.setItem("userAvatar", response.data.avatar);
                sessionStorage.setItem("sessName", response.data.sessionName);
                setNewSession(sessionStorage.getItem("sessID"));
                console.log("new session is: " + sessionStorage.getItem("sessID"));
            }
        } catch (error) {
            console.error("Error joining session: " + error);
        }

    }


    async function deleteSession() {
        

        try {

        console.log("Delete Session");

        console.log(formData.deleteSessionID.current.value);

        const response = await axios.post("http://localhost:4000/api/delete-session" , {
            sessionID: formData.deleteSessionID.current.value

        });

        if (!response) console.log("Server not found");

        else {
            console.log("Successfully deleted a session!")
            sessionStorage.removeItem("userNickname",response.data.nickname);
            sessionStorage.removeItem("sessID",response.data.sessionID);
            sessionStorage.removeItem("userAvatar",response.data.avatar);
            sessionStorage.removeItem("sessName",response.data.sessionName);
            
        }

    }

        catch (error) {

            console.log("Error deleting session: " + error);

        }

      }
      
    
  
    async function onClickCreate() {
        setNewClicked(true);    
    }

    async function onClickJoin() {
        setJoinClicked(true);
    }

    function onBackClickCreate() {
        setNewClicked(false);
    }

    function onBackClickJoin() {
        setJoinClicked(false);
    }

    return (
      <>
           <img id="main-logo" src={NuntiusLogo} alt="nuntius-logo"/>
           {
              newClicked ? (
                  <div id="create-session-enter">
                      <form id="create-session-form">
                          <b>Session Name</b>
                          <input type="text" id="create-session-input" ref={formData.sessionName}/>
                          <div className="button-spacer"></div>
                          <b>Username</b>
                          <input type="text" className="username-input" ref={formData.nickname}/>
                          <div className="big-button-spacer"></div>
                          <Link className="the-button-link" to="/chatroom">
                              <button id="confirm-create" onClick={establishSession}>Create Session</button>
                          </Link>
                          <button className="back-button" onClick={onBackClickCreate}>Back</button>
                      </form>
                  </div>
              ) : joinClicked ? (
                  <div id="join-session-enter">
                      <form>
                          <b>Session ID</b>
                          <input type="text" id="join-session-input" ref={formData.joinSessionID}/>
                          <div className="button-spacer"></div>
                          <b>Username</b>
                          <input type="text" className="username-input" ref={formData.joinNickname}/>
                          <div className="big-button-spacer"></div>
                          <Link className="the-button-link" to="/chatroom">
                              <button id="confirm-join" onClick={enterSession}>Join Session</button>
                          </Link>
                          <button className="back-button" onClick={onBackClickJoin}>Back</button>    
                      </form>
                  </div>
              ) : (
                  <div id="home-page-buttons">
                      <button id="create-session-button" onClick={onClickCreate}>Create Session</button>
                      <div className="button-spacer"/>
                      <button id="join-session-button" onClick={onClickJoin}>Join Session</button>
                      <input
                          type="text"
                          placeholder="Session ID to Delete"
                          ref={formData.deleteSessionID}
                          style={{marginTop: "10px"}}
                      />
                      <button id="delete-session-button" onClick={deleteSession}>Delete Session</button>
                  </div>
              )
           }        
      </>
  );
}
