import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import PopularMovie from "./components/MovieDatabase/PopularMovie";
import Search from "./components/Search/Search";
//import { Route, Routes } from "react-router-dom";
//import Search from "./components/Search/Search";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 768;
  //const lg = 1024;
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  function searchMovies(apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => console.error("err" + err));
  }

  return (
    <>
      {" "}
      <div>{width < breakPoint ? <MobileNavbar /> : <Navbar />}</div>{" "}
      {/* search bar */}
      <div className="mt-[65px] mx-[20px]">
        <Search onSearch={searchMovies} />
      </div>
      {data.length == 0 ? (
        <PopularMovie />
      ) : (
        <div>
          {data.map((res, id) => (
            <div key={id}>
              <h1>{res.original_title}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
