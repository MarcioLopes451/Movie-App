import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import PopularMovie from "./components/MovieDatabase/PopularMovie";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 768;
  //const lg = 1024;
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  function searchMovies() {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => console.error("err" + err));
  }

  useEffect(() => {
    if (query.trim() !== "") {
      searchMovies();
    }
  }, [query]);

  function enter(e) {
    e.preventDefault();
    searchMovies();
  }

  return (
    <>
      {" "}
      <div>{width < breakPoint ? <MobileNavbar /> : <Navbar />}</div>{" "}
      {/* search bar */}
      <div className="mt-[65px] mx-[20px]">
        <form onSubmit={enter}>
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      {query == "" ? (
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
