import { useEffect, useRef, useState } from "react";


function useFetch(url, retryTime) {
    const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(false)
    const timer = useRef(null);

    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setFinalData(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getData();
    }, [url])

    //When the component mounts for the first time get the data every ten seconds
    useEffect(() => {
        //retryTime is in seconds, but setInterval takes milliseconds
        //so we need to convert seconds to milliseconds by multiplying by 1000
        timer.current = setInterval(() => {
            setLoading(false);
            getData();
        }, retryTime * 1000);

        return () => {
            clearInterval(timer.current);
        }
    }, [])

    return { finalData, loading }
}

export { useFetch }
