// Custom Hook: useCounter
// This hook manages a count state and provides a function to increase the count.

import { useState } from 'react';

function useCounter() {
    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(c => c + 1);
    }

    return { count, increaseCount };
}

export default useCounter;
