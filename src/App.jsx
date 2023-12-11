import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import Search from "../images/2024633_find_magnifier_research_search_icon.png";
import PopularMovie from "./components/MovieDatabase/PopularMovie";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 768;
  //const lg = 1024;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <>
      {" "}
      <div>{width < breakPoint ? <MobileNavbar /> : <Navbar />}</div>{" "}
      {/* search bar */}
      <div className="mt-[65px] mx-[20px]">
        <img src={Search} className="w-[60px] h-[60px] float-right" />
        <PopularMovie />
      </div>
    </>
  );
}

export default App;
