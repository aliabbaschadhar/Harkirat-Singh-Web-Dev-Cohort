// Custom Hook: usePrev
// This hook returns the previous value of a state variable.

import { useEffect, useRef } from 'react';

function usePrev(value) {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current; // Returns the previous value
}

export default usePrev;
