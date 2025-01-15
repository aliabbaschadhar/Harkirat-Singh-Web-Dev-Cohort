import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch';

//Custom Hook
function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(c => c + 1);
  }

  return { count, increaseCount };
}

// function useFetch() {
//   const [post, setPost] = useState({});

//   const getPost = async () => {
//     const respose = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const json = await respose.json();
//     setPost(json);
//   }

//   //Want to run that logic when the component mounts for the first time in the DOM
//   useEffect(() => {
//     getPost();//We want to perform async task here but in react we can't make useEffect async
//     // so for that we will create our own function getPost();
//   }, [])

//   return { post };
// }

// Returns the previous value stored in the state
function usePrev(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value])

  return ref.current;
}


function App() {
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
    </>
  )
}

export default App
