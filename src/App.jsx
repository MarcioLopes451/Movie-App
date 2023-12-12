import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import PopularMovie from "./components/MovieDatabase/PopularMovie";
import Search from "./components/Search/Search";
import rating from "../images/216411_star_icon (2).png";
import { Route, Routes } from "react-router-dom";
import TopRatedMovies from "./components/MovieDatabase/TopRatedMovies";
import UpComingMovies from "./components/MovieDatabase/UpComingMovies";
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
        <Routes>
          <Route path="/Movie-App/" element={<PopularMovie />} />
          <Route
            path="/Movie-App/TopRatedMovies"
            element={<TopRatedMovies />}
          />
          <Route
            path="/Movie-App/UpComingMovies"
            element={<UpComingMovies />}
          />
        </Routes>
      ) : (
        <div className="mt-[60px] mx-[20px]">
          <div className="flex flex-wrap flex-row justify-between gap-4">
            {data.map((res, id) => (
              <div key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                  alt="poster"
                  className="w-[150px] h-[255px] rounded-lg"
                />
                <h3 className="text-center w-[150px]">{res.title}</h3>
                <div className="flex items-center justify-center">
                  <img
                    src={rating}
                    alt="star rating"
                    className="w-[30px] h-[30px]"
                  />
                  <h3>{res.vote_average}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
