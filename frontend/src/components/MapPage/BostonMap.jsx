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
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                center: [-71.0589, 42.3101],
                scale: 140000
            }}
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
    );
}