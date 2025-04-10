import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' //For routing

import './App.css'

function App() {

  //Another approach of doing routes in react 
  const routes = [

    {
      path: '/',
      element: <Landing />,
      children: "You are on landing page!"
    },
    {
      path: '/neet/online-coaching-class-11',
      element: <Class11Program />,
      children: "Class 11 prepration"
    }
  ]
  // After that they map over that array
  // To create a new route they add another object in the routes array

  return (
    <>
      {/* Dumb way do navigation in react */}

      {/* <a href="/">Allen</a>
      |
      <a href="/neet/online-coaching-class-11">Class 11</a>
      |
      <a href="/neet/online-coaching-class-12">Class 12</a> */}
      {/* If we use that kind of routing in a react app we will lose all the benefits of single page application */}
      {/* Whenever we click an <a/> tag in react it gets load from scratch and fetch page's HTML & JS again from server which is not optimized bcz due to that react have to build the virtual dom again and again. */}


      <BrowserRouter>
        {/* <Link to="/">Allen</Link>
        |
        <Link to="/neet/online-coaching-class-11">Class 11</Link>
        |
        <Link to="/neet/online-coaching-class-12">Class 12</Link> */}

        <Routes>

          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/neet/online-coaching-class-11' element={<Class11Program />} />
            <Route path='/neet/online-coaching-class-12' element={<Class12Program />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

function Layout() {
  return (
    <>
      <Header />
      <div style={{ height: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <>
      <Link to="/">Allen</Link>
      |
      <Link to="/neet/online-coaching-class-11">Class 11</Link>
      |
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
    </>
  )
}

function Footer() {
  return (
    <>
      <div>I am footer</div>
    </>
  )
}

function Landing() {
  return <div>Welcome to Allen!</div>
}

function Class11Program() {
  return (
    <>
      <div>Neet programs for class 11</div>
    </>
  )
}


function Class12Program() {
  const navigate = useNavigate(); // Redirecting user without using LINK tag provided in react router

  return (
    <>
      <div>Neet programs for class 12</div>
      <button onClick={() => navigate("/")}>Go to the landing page</button>
    </>
  )
}

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Content not found!</h2>
      <button onClick={() => navigate("/")}>Go back to Home</button>
    </>
  )
}

export default App
