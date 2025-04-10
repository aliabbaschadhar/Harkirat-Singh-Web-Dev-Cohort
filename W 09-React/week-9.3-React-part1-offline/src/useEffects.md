# useEffect

Before we understand `useEffect` , let’s understand what are `Side effects`.

## Side effects

Side effects are operations that interact with the outside world or have effects beyond the component's rendering. Examples include:

- **Fetching data** from an API.
- **Modifying the DOM** manually.
- **Subscribing to events** (like WebSocket connections, timers, or browser events).
- **Starting a clock**

These are called side effects because they don't just compute output based on the input—they affect things outside the component itself.

### Problem in running side effects in React components

If you try to introduce side effects directly in the rendering logic of a component (in the return statement or before it), React would run that code every time the component renders. This can lead to:

- **Unnecessary or duplicated effects** (like multiple API calls).
- **Inconsistent behavior** (side effects might happen before rendering finishes).
- **Performance issues** (side effects could block rendering or cause excessive re-rendering).

## **How `useEffect` Manages Side Effects:**

The `useEffect` hook lets you perform side effects in functional components in a safe, predictable way:

```jsx
useEffect(() => {
  // Code here is the "effect" — this is where side effects happen
  fetchData();

  // Optionally, return a cleanup function that runs when the component unmounts.
  return () => {
    // Cleanup code, e.g., unsubscribing from an event or clearing timers.
  };
}, [/* dependencies */]);
```

- **The first argument** to `useEffect` is the effect function, where you put the code that performs the side effect.
- **The second argument** is the dependencies array, which controls when the effect runs. This array tells React to re-run the effect only when certain values (props or state) change. If you pass an empty array `[]`, the effect will only run **once** after the initial render (when the component mounts).
- **Optional Cleanup**: If your side effect needs cleanup (e.g., unsubscribing from a WebSocket, clearing intervals), `useEffect` allows you to return a function that React will call when the component unmounts or before re-running the effect.

- **e.g.** If we are have a counter which updates its state everytime button get clicked. So, when we click the button the `cleanup()` function will gets called and then the effect function gets called in the `useEffect()` hook.