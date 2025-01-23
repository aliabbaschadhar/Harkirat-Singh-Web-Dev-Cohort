import { FaComputer } from "react-icons/fa6"
// import Otp from "./components/Otp"
import NoLoopUseRefInterview from "./components/NoLoopUseRefInterview"
export default function App() {
  return (
    <div className="bg-blue-700 h-screen w-screen flex flex-col items-center">
      <div className="flex text-3xl gap-2 mt-14">
        <h1 className="m-1"><FaComputer /></h1>
        <div className="flex text-4xl">
          <div className="text-cyan-500">Webinar</div>
          <div className="text-white">.gg</div>
        </div>
      </div>
      <div className=" text-white text-2xl my-16 font-bold  ">Verify Your Age</div>
      <p className="text-white mb-4">Please confim your birth year. This data will not be stored.</p>
      <input
        type="text"
        placeholder="Your Birth Year"
        className="  border border-gray-300 rounded-md px-16 py-3 mb-8"
      />

      <button className="px-32 py-3 text-white text-2xl bg-gray-500 rounded-lg">Continue</button>

      <NoLoopUseRefInterview number={10} />

      {/* <Otp /> */}
    </div>
  )
}