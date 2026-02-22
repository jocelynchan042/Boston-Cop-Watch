import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
    return(
        <>
            <header className="header">
                <Link className="headerLeft" to="/">
                
                    <div className="logo">
                        <img src="\BosCopWatchLogo.png" alt="Boston Cop Watch Logo" className="logoImage"/>
                    </div>
                    <div>
                        <div className="logoTitle">Boston Cop Watch</div>
                        <div className="logoSub">Youth Focused · Know Your Rights · Boston, MA</div>
                    </div>
                </Link>
                <div className="headerRight">
                    <nav>
                        <Link className="navButton" to="/">Home</Link>
                        <Link className="navButton" to="/chat">Chat</Link>
                        <Link className="navButton" to="/map">Map</Link>
                    </nav>

                    <div className="disclaimer">
                        Not legal advice · For information only
                    </div>
                </div>
            </header>



        </>
    );
}