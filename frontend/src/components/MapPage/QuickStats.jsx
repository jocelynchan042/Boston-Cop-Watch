import {useEffect, useState} from "react";
export default function QuickStats({zip}) {
    const [numIncidents, setNumIncidents] = useState(null);
    const [numIncidentsJuvenile, setNumIncidentsJuvenile] = useState(null);

    useEffect(() => {
        if (!zip) return;

        fetch("/stats2.json")
            .then(res => res.json())
            .then(data => {

                // ALL incidents
                const allItem = data.incidents_by_zip_all.data.find(
                    d => String(d.zip) === String(zip)
                );

                // JUVENILE incidents
                const juvenileItem = data.incidents_by_zip_juvenile_only.data.find(
                    d => String(d.zip) === String(zip)
                );

                setNumIncidents(allItem ? allItem.incidents : "N/A");
                setNumIncidentsJuvenile(juvenileItem ? juvenileItem.incidents : "N/A");

            })
            .catch(err => {
                console.error(err);
                setNumIncidents("Error");
                setNumIncidentsJuvenile("Error");
            });

    }, [zip]);


    return(
        <>
            <div style={{width: "100%", height: "100%", display:"flex", flexDirection:"column", gap:"3%"}}>
                <div style={{width: "100%"}}>
                    <h1>Quick Stats</h1>
                    <h2>Selected ZIP: {zip || "Click a ZIP code"}</h2>
                </div>
                <div>
                    <p># of Stops by Police (2022-2025):</p>
                    <p>All: {numIncidents !== null ? numIncidents : "Loading..."}</p>
                    <p>Juveniles: {numIncidentsJuvenile !== null ? numIncidentsJuvenile : "Loading..."}</p>
                    <p># Reports of Alleged Misconduct: {numIncidents !== null ? numIncidents : "Loading..."}</p>
                </div>
            </div>
        </>

    );
}