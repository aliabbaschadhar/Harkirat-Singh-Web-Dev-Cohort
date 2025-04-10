export default function Loading() {
    return <div>
        Loading...
    </div>
}

// Nexjs server will fetch the data and it will see if the data fetching is taking too long.
// Then it will fall back to a file called loading.tsx and render the file on the Client Side;