import NuntiusEmblem from "../images/nuntius_emblem.png";
import {Link} from "react-router-dom";

export default function Navbar({setSession, setNewSession}) {

    function clear_out_session_upon_exit() {
        setSession('');
        setNewSession('');
        sessionStorage.setItem("userNickname", '');
        sessionStorage.setItem("sessID", '');
        sessionStorage.setItem("userAvatar", '');
        sessionStorage.setItem("sessName", '');
    }

    return (
        <>
            <div className="the-nav container-fluid">
                <img className="nuntius-emblem" src={NuntiusEmblem} alt="Nuntius-emblem"/>
                <div className="right-items">
                    <p className="welcome">Welcome, {sessionStorage.getItem("userNickname")}</p>
                    <Link to="/">
                        <button className="leave-session"
                                onClick={() => clear_out_session_upon_exit()}>Leave Session</button>
                    </Link>
                </div>
                
                
            </div>
        </>
    )
}