import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css'
import { countAtom } from './store/atoms/count';
import { evenSelector } from "./store/selectors/evenSelector"

export default function App() {
  return <div>
    <RecoilRoot>
      <Button1 />
      <Button2 />
      <Counter />
      <IsEven />
    </RecoilRoot>
  </div>
}

function Button1() {
  const setCount = useSetRecoilState(countAtom);

  return <div>
    <button onClick={() => setCount(c => c + 2)}>Increase</button>
  </div>
}

function Button2() {
  const setCount = useSetRecoilState(countAtom);

  return <div>
    <button onClick={() => setCount(c => c - 1)}>Decrease</button>
  </div>
}

function Counter() {
  const count = useRecoilValue(countAtom);

  return <div>
    Count is : {count}
  </div>
}

function IsEven() {
  const even = useRecoilValue(evenSelector); // This is a derived state(Selector) that depends on countAtom atom and isEven will only re-render if the value of state in evenSelector changes like "even" to "odd".
  // It does not re-render the component if the value is changed by 24 to 26 in countAtom.
  // This is because evenSelector is a derived state.
  // IsEven is subscribed only to evenSelector and not to countAtom

  const count = useRecoilValue(countAtom); // Now if the value of state changes in countAtom the component will re-render.
  // Bcz const count is subscribed to countAtom 
  // As we know that component will re-render if the state in the atom changes.


  return <div>
    {even ? "Even" : "Odd"}
    {/* {count % 2 == 0 ? "Even" : "Odd"}
      Now as we know that count is not a derived state so it will re-render when the value of count changes in the countAtom.
    */}
  </div>
}