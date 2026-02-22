import {ComposableMap, Geographies} from "react-simple-maps";
import {ZipLayer} from "./ZipLayer.jsx";
import {useState} from "react";

const geoUrl = "/boston_zips.geojson";

export default function BostonMap({ onZipSelect }) {
    const [selectedZip, setSelectedZip] = useState(null);

    const handleSelect = (zip) => {
        setSelectedZip(zip);
        onZipSelect?.(zip);
    };

    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 12, border: "5px solid lightblue" }}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [-71.0589, 42.301], scale: 130000 }}
                style={{ width: "100%", height: "100%" }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) => (
                        <ZipLayer
                            geographies={geographies}
                            selectedZip={selectedZip}
                            onSelect={handleSelect}
                        />
                    )}
                </Geographies>
            </ComposableMap>
        </div>
    );
}