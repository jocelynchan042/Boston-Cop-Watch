import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
    return(
        <>
            <header className="header">
                <div className="headerLeft">
                    <div className="logo">⚖</div>
                    <div>
                        <div className="logoTitle">Boston Cop Watch</div>
                        <div className="logoSub">Youth Focused · Know Your Rights · Boston, MA</div>
                    </div>
                </div>
                <div className="headerRight">
                    <nav>
                        <Link className="mapBtn" to="/">Home</Link>
                        <Link className="mapBtn" to="/chat">Chat</Link>
                        <Link className="mapBtn" to="/map">Map</Link>
                    </nav>

                    <div className="disclaimer">
                        Not legal advice · For information only
                    </div>
                </div>
            </header>



        </>
    );
}