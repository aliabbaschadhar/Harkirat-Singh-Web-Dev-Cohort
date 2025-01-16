
import './App.css'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  const setRecoilTodo = useSetRecoilState(todosAtomFamily(2));
  // Atoms work when you know something is gonna appear only once on the screen 
  // But if something is gonna appear multiple times on the screen then you have each atom for each component
  // But this approach is not recommended so you should use atoms family and create atoms for them dynamically
  setRecoilTodo({ title: "New Todo", description: " Hi Boy what's up " });
  return <>
    <Todo id={1} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
  </>
}

function Todo({ id }) {
  const [todo] = useRecoilValue(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App
