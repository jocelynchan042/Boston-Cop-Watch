import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
    
    return (
        <>
            <div className="landingPage">
                <h3 className="landingBadge">Welcome to Boston Cop Watch</h3>
                <div className="landingHeaderContainer">
                    <h1 className="landingHeader">A look into Boston's</h1>
                    <h1 className="landingHeader">Police Activity</h1>                    
                </div>

                <h7 className="description">An interactive civic-tech platform designed to provide structured, legally responsible information about Boston Police Department (BPD) youth interactions and accountability data.
    </h7>
                <Link className="homePageButton" to="/Map">View Map</Link>                
            </div>

            <div>

            </div>

        </>
    )
}