import { useEffect, useState } from "react"
import { SideBarToggle } from "./components/icons/SideBarToggle";


const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)

    media.addEventListener(listener);

    return () => media.removeEventListener(listener);
  }, [matches, query])

  return matches;
}
function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop === false)
      setSideBarOpen(false);

  }, [isDesktop]);

  return (
    <div className="h-screen flex">
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <MainContent />
    </div>
  )
}

function SideBar({ sideBarOpen, setSideBarOpen }) {
  return (
    <div className={`h-full md:w-[${sideBarOpen ? "20vw" : "5vw"}] bg-blue-400 flex-shrink-0 rounded-sm transition-all duration-1000`}>
      <div
        className="fixed top-0 left-0 cursor-pointer hover:bg-slate-200"
        onClick={() => setSideBarOpen((prev) => !prev)}
      >
        <SideBarToggle />
      </div>
    </div>
  )
}

function MainContent() {
  return (
    <div className="h-full w-full">
      <div className="bg-amber-300 h-72 hidden md:block"></div>
      <div className="grid grid-cols-10 gap-8 p-8">
        <div className="bg-violet-300 md:col-span-2 h-36 -translate-y-24 rounded-lg shadow-lg hidden md:block"></div>
        <div className="bg-orange-500 md:col-span-5 h-52 rounded-lg shadow-lg col-span-10"></div>
        <div className="bg-purple-700 md:col-span-3 h-72 rounded-lg shadow-lg col-span-10"></div>
      </div>
    </div>
  )
}

export default App

