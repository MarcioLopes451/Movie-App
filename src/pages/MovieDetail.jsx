import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import rating from "../../images/216411_star_icon (2).png";
import noMoviePoster from "../../images/no-poster-available.jpg";
import Back from "../../images/2203523_arrow_back_botton_left_icon (1).png";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [movie1, setMovie1] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const movieurl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((err) => console.error("error " + err));
  }, [url]);

  useEffect(() => {
    fetch(movieurl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie1(data);
      })
      .catch((err) => console.error("error " + err));
  }, [movieurl]);

  return (
    <div className="mt-5">
      {movie1 ? (
        <div className="flex justify-center items-center flex-col font-Inria-Serif lg:flex-row lg:mx-[20px] lg:gap-[80px] lg:items-start">
          <img
            src={
              movie1.poster_path == null
                ? noMoviePoster
                : `https://image.tmdb.org/t/p/w500${movie1.poster_path}`
            }
            alt="movie poster"
            className="w-[300px] h-[510px] rounded-lg lg:w-[450px] lg:h-[700px]"
          />
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
            <h2 className="mt-5 text-3xl font-semibold text-center lg:mt-0 lg:text-3xl lg:text-start">
              {movie1.title}
            </h2>
            <p className="mt-2 italic underline text-center px-2 lg:px-0 lg:text-xl lg:mt-5 lg:text-start">
              {movie1.tagline}
            </p>
            <div className="flex items-center flex-col lg:flex-row-reverse w-full justify-between">
              <div className="flex mt-4 justify-center items-center">
                <p>{movie1.release_date.slice(0, 4)}</p>
                <p>/{movie1.runtime} Minutes</p>
              </div>
              <div className="flex items-center justify-center mt-4">
                <img
                  src={rating}
                  alt="star rating"
                  className="w-[30px] h-[30px]"
                />
                <h3 className="text-xl">{Math.floor(movie1.vote_average)}</h3>
              </div>
            </div>
            <div className="text-center mt-4 lg:text-left">
              <h3 className="text-3xl font-semibold">GENRE</h3>
              <p className="flex gap-3 justify-center flex-wrap mt-5">
                {movie1.genres.map((g) => (
                  <p key={g.id} className="font-semibold text-lg">
                    {g.name}
                  </p>
                ))}
              </p>
            </div>
            <div className="mt-10 text-center lg:text-left">
              <h3 className="font-semibold text-3xl">SUMMARY</h3>
              <p className="mt-3 px-2 lg:px-0">{movie1.overview}</p>
            </div>
            {movie ? (
              <div className="mt-10 text-center lg:text-left">
                <h3 className="font-semibold text-3xl">THE ACTORS</h3>
                <div className="flex flex-col gap-3 mt-5 italic lg:flex-row lg:flex-wrap lg:justify-between">
                  {movie.cast.slice(0, 4).map((actor) => (
                    <Link key={actor.id} to={`/Movie-App/person/${actor.id}`}>
                      <p className="hover:underline">{actor.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 w-full flex justify-center items-center lg:justify-normal">
                  <img
                    src={Back}
                    className="w-[50px] h-[50px] cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                </div>
              </div>
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
