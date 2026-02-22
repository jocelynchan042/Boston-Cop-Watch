import BostonMap from "./BostonMap.jsx";
import {useState} from "react";
import QuickStats from "./QuickStats";

export default function MapPage() {
    const [selectedZip, setSelectedZip] = useState(null);

    return (
        <div style={{ display: "flex", height:"100vh", gap:"2%", padding:"2%", paddingTop:"4%"}}>
            <div style={{width: "60%", height:"87%", border: "5px solid lightblue", borderRadius: "12px", overflow: "hidden"}}>
                <BostonMap onZipSelect={setSelectedZip} />
            </div>

            <div style={{width: "30%" }}>
                <QuickStats zip={selectedZip} />
            </div>
        </div>
    )
}