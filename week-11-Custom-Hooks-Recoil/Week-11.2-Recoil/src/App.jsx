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
  const even = useRecoilValue(evenSelector);

  return <div>
    {even ? "Even" : "Odd"}
  </div>
}