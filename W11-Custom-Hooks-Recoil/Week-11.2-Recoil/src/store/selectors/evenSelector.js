import { selector } from "recoil";
import { countAtom } from "../atoms/count";

export const evenSelector = selector({
    key: "isEvenSelector",
    //Now we can't write default:0 bcz selectors are drived states and they depend on atoms to reduce no of re-renders. So we will use a get function to get the value of slector.
    get: function ({ get }) {
        const count = get(countAtom); // Give me current count of state item in Atom so that i can apply some computations on it and get desired result
        const isEven = (count % 2 == 0)
        return isEven;
    }
})