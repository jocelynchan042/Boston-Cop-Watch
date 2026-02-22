import { useState } from "react";
import BostonMap from "./BostonMap";
import QuickStats from "./QuickStats";

export default function MapPage() {
  const [selectedZip, setSelectedZip] = useState(null);

  return (
    <div className="mapPageLayout">
      <div className="mapPanel">
        <BostonMap onZipSelect={setSelectedZip} />
      </div>

      <div className="statsPanel">
        <QuickStats zip={selectedZip} />
      </div>
    </div>
  );
}