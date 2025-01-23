
import { createContext, useState } from 'react'
import './App.css'
import { useContext } from 'react';

const BulbContext = createContext();

function App() {

  const [bulbOn, setBulbOn] = useState(true)
  return (
    <>
      <BulbContext.Provider value={{
        bulbOn: bulbOn,
        setBulbOn: setBulbOn
      }} >
        <LightBulb />
      </BulbContext.Provider>
    </>
  )
}

function LightBulb() {
  return (
    <div>
      {/* <BulbState bulbOn={bulbOn} /> */}
      {/* <ToggleBulbState setBulbOn={setBulbOn} /> */}
      {/* After using context API */}
      <BulbState />
      <ToggleBulbState />
    </div>
  )
}

function BulbState() {
  const { bulbOn } = useContext(BulbContext)
  return (
    <div>
      {bulbOn ? "Bulb On" : "Bulb Off"}
    </div>
  )
}

function ToggleBulbState() {
  const { setBulbOn } = useContext(BulbContext);
  return (
    <div>
      <button onClick={() => setBulbOn((prevState) => !prevState)}>Toggle Bulb</button>
    </div>
  )
}

export default App
