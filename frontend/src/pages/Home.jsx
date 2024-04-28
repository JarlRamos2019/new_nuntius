import NuntiusLogo from "../images/nuntius_logo.png";

export default function Home() {
    return (
        <>
             <img id="main-logo" src={NuntiusLogo} alt="nuntius-logo"/>
             <div id="home-page-buttons">
                <button id="create-session-button">Create Session</button>
                <div className="button-spacer"/>
                <button id="join-session-button">Join Session</button>
             </div>
            
        </> 
    )
}