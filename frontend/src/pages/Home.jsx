import NuntiusLogo from "../images/nuntius_logo.png";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Home() {

    const [newClicked, setNewClicked] = useState(false);
    const [joinClicked, setJoinClicked] = useState(false);

    function onClickCreate() {
        setNewClicked(true);
    }

    function onClickJoin() {
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
                        <b>Session ID</b>
                        <input type="text" id="create-session-input"/>
                        <div className="big-button-spacer"></div>
                        <Link className="the-button-link" to="/chatroom">
                            <button id="confirm-create">Create Session</button>
                        </Link>
                        <button className="back-button" onClick={() => onBackClickCreate()}>Back</button>
                    </div>    
                ) : ( joinClicked ? (
                        <div id="join-session-enter">
                            <b>Session ID</b>
                            <input type="text" id="join-session-input"/>
                            <div className="big-button-spacer"></div>
                            <Link className="the-button-link" to="/chatroom">
                                <button id="confirm-join">Join Session</button>
                            </Link>
                            <button className="back-button" onClick={() => onBackClickJoin()}>Back</button>
                        </div>      
                      ) : (
                        <div id="home-page-buttons">
                            <button id="create-session-button" onClick={() => onClickCreate()}>Create Session</button>
                            <div className="button-spacer"/>
                            <button id="join-session-button" onClick={() => onClickJoin()}>Join Session</button>
                        </div>
                      )
                )
             }        
        </> 
    )
}