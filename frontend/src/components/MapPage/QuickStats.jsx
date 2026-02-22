import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import "./Charts.css";
export default function QuickStats({zip}) {
    const [numIncidents, setNumIncidents] = useState(null);
    const [numIncidentsJuvenile, setNumIncidentsJuvenile] = useState(null);
    const [raceJuvenileData, setRaceJuvenileData] = useState([]);
    const [raceData, setRaceData] = useState([]);


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


                // race distributions
                setRaceJuvenileData(data.race_distribution_juvenile.data.map(d => ({
                    ...d,
                    percent: Number(d.percent)
                }
            )));
                setRaceData(data.race_distribution_all.known_race_distribution.map(d => ({
                    ...d,
                    percent: Number(d.percent)
                })
            ));
                console.log(raceJuvenileData);
                console.log(raceData);

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
                <div className="chart-card">
                    <h3>All Boston Stops by Race (%) (2022-2025)</h3>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={raceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="race"
                                   angle={-45}
                                   textAnchor="end"
                                   interval={0}
                                   fill="blue"
                            />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="percent" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                    <div className="chart-card">
                        <h3>All Boston Juvenile Stops by Race (%) (2022-2025)</h3>
                        <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={raceJuvenileData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="race" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="percent"
                                 fill="#1e3a8a"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
                </div>
            </div>
        </>

    );
}