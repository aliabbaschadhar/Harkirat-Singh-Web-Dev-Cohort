import { useEffect, useState } from 'react';
import usePrev from './hooks/usePrev';
import useDebounce from './hooks/useDebounce';
import './App.css'
// import { useFetch } from './hooks/useFetch';



function App() {
  const [inputVal, setInputVal] = useState("");
  const deboucedValue = useDebounce(inputVal, 200);

  useEffect(() => {
    //Run this expensive function
    console.log("Expensive function ran!")
  }, [deboucedValue])


  //useCounter
  // const { count, increaseCount } = useCounter();

  //usefetch()
  // const [currentPost, setCurrentPost] = useState(1);
  // const { finalData, loading } = useFetch("https://jsonplaceholder.typicode.com/todos/" + currentPost, 4);

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  const [state, setState] = useState(0);
  const prev = usePrev(state);

  return (
    <>
      <div>
        {/* <button onClick={increaseCount}>count is {count}</button> */}
        {/* useFetch */}
        {/* <button onClick={() => setCurrentPost(1)}>1</button>
        <button onClick={() => setCurrentPost(2)}>2</button>
        <button onClick={() => setCurrentPost(3)}> 3</button>
        <br />
        <pre>{JSON.stringify(finalData, null, 3)}</pre> */}

        <div>Now count is : {state}</div>
        <button onClick={() => setState(prev => prev + 1)}>Click me to increase the state</button>
        <div>Previous value was : {prev}</div>
      </div>

      <div>
        <input type="text" onChange={(e) => setInputVal(e.target.value)} />
      </div>
    </>
  )
}

export default App
