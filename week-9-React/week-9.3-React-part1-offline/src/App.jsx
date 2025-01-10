import React, { useState, useEffect } from 'react'

//*********************useEffect*******************//
// Function to fetch data from an API
const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export default function App() {

    // State to store fetched data
    const [data, setData] = useState(null)

    // Effect to fetch data when component mounts
    useEffect(() => {
        // Fetch data when component mounts
        const loadData = async () => {
            const fetchedData = await fetchData()
            setData(fetchedData)
        }

        // Run the effect once when the component mounts
        loadData()

        // Clean up function to cancel any ongoing requests
        return () => {
            // Cancel any pending fetch requests
            // This is not necessary in this example but can be useful in other scenarios
            // clearTimeout(timeoutId)
        }
    }, []) // Empty dependency array means this effect runs only once


    // Render component
    return (
        <div>
            {/* Display fetched data */}
            {data ? (
                <div>
                    <h1>Fetched Data:</h1>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* Render Greeting components */}
            <Greeting name="John" />
            <Greeting name="Jane" />
        </div>
    )
}

function Greeting(props) {
    return <div>Hello {props.name}</div>
}
