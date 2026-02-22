import {ZipGeography} from "./ZipGeography.jsx";

export function ZipLayer({ geographies, selectedZip, onSelect }) {
    return (
        <>
            {geographies.map((geo) => (
                <ZipGeography
                    key={geo.rsmKey}
                    geo={geo}
                    selectedZip={selectedZip}
                    onSelect={onSelect}
                />
            ))}
        </>
    );
}