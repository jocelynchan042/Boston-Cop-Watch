import BostonMap from "./BostonMap.jsx";
import {useState} from "react";
import QuickStats from "./QuickStats";

export default function MapPage() {
    const [selectedZip, setSelectedZip] = useState(null);

    return (
        <div style={{ display: "flex", height:"100vh", gap:"2%", padding:"2%", paddingTop:"4%"}}>
                <BostonMap onZipSelect={setSelectedZip} />
            <div style={{width: "30%", height:"100%" }}>
                <QuickStats zip={selectedZip} />
            </div>
        </div>
    )
}