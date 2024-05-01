import NuntiusLogo from "../images/nuntius_logo.png";
import {useState, useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Home() {

    const [newClicked, setNewClicked] = useState(false);
    const [joinClicked, setJoinClicked] = useState(false);
    const dummy = "Nicolette";

    async function establishSession() {
        try {
            const response = await axios.post("http://localhost:4000/api/create-session", {
                nickname: dummy
            });

            sessionStorage.setItem("userNickname", response[0].data.nickname);
            sessionStorage.setItem("sessID", response[0].data.sessionID);
            sessionStorage.setItem("userAvatar", response[0].data.avatar);
        } catch (error) {
            console.error("Error creating session: " + error);
        }  

    }

    async function enterSession() {
        try {
            const response = await axios.post("http://localhost:4000/api/join-session", {
                nickname: dummy
            });

            if (!response) console.log("Server not found");
            else {
                sessionStorage.setItem("userNickname", response[0].data.nickname);
                sessionStorage.setItem("sessID", response[0].data.sessionID);
                sessionStorage.setItem("userAvatar", response[0].data.avatar);
            }
        } catch (error) {
            console.error("Error joining session: " + error);
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
                            <b>Session ID</b>
                            <input type="text" id="create-session-input"/>
                            <div className="button-spacer"></div>
                            <b>Username</b>
                            <input type="text" className="username-input"/>
                            <div className="big-button-spacer"></div>
                            <Link className="the-button-link" to="/chatroom">
                                <button id="confirm-create" onClick={() => establishSession()}>Create Session</button>
                            </Link>
                            <button className="back-button" onClick={() => onBackClickCreate()}>Back</button>
                        </form>
                    </div>    
                ) : ( joinClicked ? (
                        <div id="join-session-enter">
                            <form>
                                <b>Session ID</b>
                                <input type="text" id="join-session-input"/>
                                <div className="button-spacer"></div>
                                <b>Username</b>
                                <input type="text" className="username-input"/>
                                <div className="big-button-spacer"></div>
                                <Link className="the-button-link" to="/chatroom">
                                    <button id="confirm-join" onClick={() => enterSession()}>Join Session</button>
                                </Link>
                                <button className="back-button" onClick={() => onBackClickJoin()}>Back</button>    
                            </form>
                        </div>      
                      ) : (
                        <div id="home-page-buttons">
                            <button id="create-session-button" onClick={() => onClickCreate()}>Create Session</button>
                            <div className="button-spacer"/>
                            <button id="join-session-button" onClick={() => onClickJoin()}>Join Session</button>
                            <button id="delete-session-button">Delete Session</button>
                        </div>
                      )
                )
             }        
        </> 
    )
}