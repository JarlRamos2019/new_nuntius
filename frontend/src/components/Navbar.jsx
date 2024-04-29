import NuntiusEmblem from "../images/nuntius_emblem.png";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="the-nav container-fluid">
                <img className="nuntius-emblem" src={NuntiusEmblem} alt="Nuntius-emblem"/>
                <Link to="/">
                    <button className="leave-session">Leave Session</button>
                </Link>
                
            </div>
        </>
    )
}