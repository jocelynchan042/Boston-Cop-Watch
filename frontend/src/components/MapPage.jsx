import BostonMapClean from "./BostonMapClean.jsx";
import {useState} from "react";

export default function MapPage() {
    const [selectedZip, setSelectedZip] = useState(null);

    return (
        <div style={{ display: "flex", height:"100vh"}}>
            <BostonMapClean onZipSelect={setSelectedZip} />

            <div style={{ padding: "5%", width: "30%" }}>
                <h2>Selected ZIP</h2>
                <p>{selectedZip || "Click a ZIP code"}</p>
            </div>
        </div>
    )
}