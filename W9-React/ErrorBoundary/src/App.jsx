import React, { useState } from 'react'

function App() {

  return (
    <>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>
      <ErrorBoundary>
        <Card2 />
      </ErrorBoundary>

    </>
  )
}

function Card1() {
  throw new Error("Error in Card 1");
  return (
    <div
      style={{
        width: "50vw",
        height: "50vh",
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 20,
        margin: 20,
      }}
    >
      <h1>Card 1</h1>
      <p>This is the content of Card 1.</p>
    </div>
  )
}

function Card2() {
  return (
    <div style={{
      width: "50vw",
      height: "50vh",
      backgroundColor: "orange",
      borderRadius: 10,
      padding: 20,
      margin: 20,
    }}

    >
      <h1>Card 2</h1>
      <p>This is the content of Card 2.</p>
    </div>
  )
}

// Class base error boundary component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            width: "50vw",
            borderRadius: 10,
            padding: 20,
            margin: 20,
          }}
        >
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default App
