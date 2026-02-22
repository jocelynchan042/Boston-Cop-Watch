import {geoCentroid} from "d3-geo";
import {Geography, Marker} from "react-simple-maps";
import {BOSTON_ZIPS} from "./BOSTON_ZIPS.js";

const getFillColor = (zip, selectedZip) => {
    if (zip === selectedZip) return "#2563eb";
    if (BOSTON_ZIPS.has(zip)) return "#dbeafe";
    return "#e5e7eb";
};

export function ZipGeography({geo, selectedZip, onSelect}) {
    const zip = geo.properties.POSTCODE;
    const centroid = geoCentroid(geo);
    const inBoston = BOSTON_ZIPS.has(zip);

    const getZipStyle = (zip, selectedZip) => (
        inBoston ?
            {
                default: { fill: getFillColor(zip, selectedZip), outline: "none" },
                hover:   { fill: "#93c5fd", outline: "none" },
                pressed: { fill: "#1d4ed8", outline: "none" }
            } : {
                default: { fill: "#e5e7eb", outline: "none" },
                hover:   { fill: "#e5e7eb", outline: "none" },
                pressed: { fill: "#e5e7eb", outline: "none" }
            }
    );

    return (
        <>
            <Geography
                geography={geo}
                onClick={() => inBoston ? onSelect(zip) : null}
                stroke="#333"
                strokeWidth={inBoston ? 0.9 : 0.1}
                style={getZipStyle(zip, selectedZip)}
            />
            {inBoston && (
                <Marker coordinates={centroid}>
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={6}
                        fontWeight="500"
                        fill={zip === selectedZip ? "#ffffff" : "#1e3a8a"}
                        style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                        {zip}
                    </text>
                </Marker>
            )}
        </>
    );
}