import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import PopularMovie from "./components/MovieDatabase/PopularMovie";
import Search from "./components/Search/Search";
import rating from "../images/216411_star_icon (2).png";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import TopRatedMovies from "./components/MovieDatabase/TopRatedMovies";
import UpComingMovies from "./components/MovieDatabase/UpComingMovies";
import Footer from "./components/Footer/Footer";
import MovieDetail from "./pages/MovieDetail";
import ActorMovies from "./pages/ActorMovies";
import noMoviePoster from "../images/no-poster-available.jpg";
import PropTypes from "prop-types";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 768;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
        console.log(data.results);
        navigate("/search-results");
      })
      .catch((err) => console.error("err" + err));
  }

  return (
    <>
      <div>{width < breakPoint ? <MobileNavbar /> : <Navbar />}</div>
      <div className="mt-[65px] mx-[20px]">
        <Search onSearch={searchMovies} />
      </div>
      <Routes>
        <Route path="/Movie-App/" element={<PopularMovie />} />
        <Route path="/Movie-App/TopRatedMovies" element={<TopRatedMovies />} />
        <Route path="/Movie-App/UpComingMovies" element={<UpComingMovies />} />
        <Route path="/Movie-App/movie/:movieId" element={<MovieDetail />} />
        <Route path="/Movie-App/person/:actorId" element={<ActorMovies />} />
        <Route path="/search-results" element={<SearchResults data={data} />} />
      </Routes>
      <Footer />
    </>
  );
}

// eslint-disable-next-line react/prop-types
const SearchResults = ({ data }) => {
  return (
    <div className="mt-[60px] mx-[20px]">
      <div className="flex flex-wrap flex-row justify-between gap-4 font-Inria-Serif md:justify-normal md:gap-[60px] lg:justify-evenly">
        {data.map((res, id) => (
          <div key={id}>
            <Link to={`/Movie-App/movie/${res.id}`}>
              <img
                src={
                  res.poster_path == null
                    ? noMoviePoster
                    : `https://image.tmdb.org/t/p/w500${res.poster_path}`
                }
                alt="poster"
                className="w-[150px] h-[255px] rounded-lg md:w-[200px] md:h-[340px] lg:w-[270px] lg:h-[459px]"
              />
              <h3 className="text-center w-[150px] md:w-[200px] lg:w-[270px]">
                {res.title}
              </h3>
              <div className="flex items-center justify-center">
                <img
                  src={rating}
                  alt="star rating"
                  className="w-[30px] h-[30px]"
                />
                <h3>{Math.floor(res.vote_average)}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default App;
