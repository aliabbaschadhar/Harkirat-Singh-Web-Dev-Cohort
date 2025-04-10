import { atomFamily } from "recoil";
import { TODOS } from "./todos";

// Atoms work when you know something is gonna appear only once on the screen 
// But if something is gonna appear multiple times on the screen then you should use atoms family

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',

  // One thing to note that in atomFamily the default value is not a value, it is a function.
  // It will tell that give me the atom according to the provided id.

  default: id => TODOS.find(todo => todo.id === id) // Returning the todo whose id matches with input id 

  //Another syntax

  // default: id => {
  //   return TODOS.find(x => x.id === id) 
  // },
});