import { atom, atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});

export const todoAtomfamily = atomFamily({
  key : "todo",
  default : selectorFamily({
    key : "todoSelector",
    get : (id)=>async({get}){
      const res = await axios.get(`http://sum-server-id=${id}`);
      return res.data.todo;
    },
  })
})