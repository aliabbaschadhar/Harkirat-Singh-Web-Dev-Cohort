import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

// Re-learning CleanUp --- useEffect --- Learning about dependency array
function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(30)

  function increase() {
    setCount1(count => count + 1);
  }


  return <div>
    <Counter count1={count1} count2={count2} />
    <button onClick={increase}>Increase Count</button>
    <button onClick={() => setCount2(count => count - 1)}>Decrease Count</button>
  </div>

}

// mounting, re-rendering, unmounting
// Till now we have learnt that when we component mounts into the DOM run the logic in the useEffect
//  And when it unmounts run the clean up function but sometimes we want to run specific logic when a state variable changes
// Then we use dependency array 
function Counter(props) {

  useEffect(() => {
    console.log("Mount");

    //cleanup
    return () => {
      console.log("Unmount");
    }
  }, [])

  useEffect(() => {
    console.log("Count has changed!");
  }, [props.count1])

  return (
    <div>
      <div>Counter1 : {props.count1}</div>
      <div>Counter2 : {props.count2}</div>
    </div>
  );
}

Counter.propTypes = {
  count1: PropTypes.number.isRequired,
  count2: PropTypes.number.isRequired
};

export default App;
