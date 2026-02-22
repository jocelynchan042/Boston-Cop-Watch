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
            {// in Boston
                default: {
                    fill: getFillColor(zip, selectedZip),
                    outline: "none"
                },
                hover: {
                    fill: "#93c5fd",
                    outline: "none"
                },
                pressed: {
                    fill: "#1d4ed8",
                    outline: "none"
                }
            } : { // not in Boston
                default: {
                    fill: "#e5e7eb",
                    outline: "none"
                },
                hover: {
                    fill: "#e5e7eb",
                    outline: "none",
                },
                pressed: {
                    fill: "#e5e7eb",
                    outline: "none"
                }
            }
    );
    return (
        <>
            <Geography
                geography={geo}
                onClick={() => inBoston ? onSelect(zip) : null}
                stroke="#333"
                strokeWidth={inBoston ? .9 : 0.1}
                style={getZipStyle(zip, selectedZip)}
            />
            {inBoston ?
                <Marker coordinates={centroid}>
                    <text
                        textAnchor="middle"
                        fontSize="0.9em"
                        fill="#000"
                        style={{pointerEvents: "none"}}
                    >
                        {zip}
                    </text>
                </Marker> : null}
        </>
    );
}