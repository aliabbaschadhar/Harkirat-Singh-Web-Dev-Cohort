// Custom Hook: useFetch
// This hook fetches data from a given URL and returns the fetched post.

import { useEffect, useState } from "react";

function useFetch(url) {
    const [post, setPost] = useState({});

    const getPost = async () => {
        const response = await fetch(url);
        const json = await response.json();
        setPost(json);
    }

    // Run the fetch function when the component mounts and whenever the URL changes
    useEffect(() => {
        getPost();
    }, [url]);

    return { post };
}

export default useFetch;
