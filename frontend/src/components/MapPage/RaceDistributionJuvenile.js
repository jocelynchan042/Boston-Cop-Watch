import { useEffect, useRef, useState } from "react";

export default function useRaceDistribution(zip) {
    const [count, setCount] = useState(null);
    const prevZipRef = useRef(null);

    useEffect(() => {
        if (!zip) {
            setCount(null);
            return;
        }

        if (zip === prevZipRef.current) return;

        prevZipRef.current = zip;

        fetch("/stats2.json")
            .then((res) => res.json())
            .then((data) => {
                const item = data.race_distribution_juvenile.data.find(
                    (d) => String(d.zip) === String(zip)
                );

                if (item) {
                    setCount(item.incidents);
                } else {
                    setCount("N/A");
                }
            })
            .catch((err) => {
                console.error(err);
                setCount("Error");
            });
    }, [zip]);

    return count;
}