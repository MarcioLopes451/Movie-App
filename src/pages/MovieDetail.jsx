import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rating from "../../images/216411_star_icon (2).png";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [movie1, setMovie1] = useState(null);
  const { movieId } = useParams();
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
        <div className="flex justify-center items-center flex-col">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie1.poster_path}`}
            alt="movie poster"
            className="w-[300px] h-[510px] rounded-lg"
          />
          <h2>{movie1.title}</h2>
          <p>{movie1.tagline}</p>
          <div className="flex items-center justify-center">
            <img src={rating} alt="star rating" className="w-[30px] h-[30px]" />
            <h3>{movie1.vote_average}</h3>
          </div>
          <div>
            <h3>GENRE</h3>
            <p className="flex gap-3">
              {movie1.genres.map((g) => (
                <p key={g.id}>{g.name}</p>
              ))}
            </p>
          </div>
          <div>
            <h3>SUMMARY</h3>
            <p>{movie1.overview}</p>
          </div>
          {movie ? (
            <div className="mt-5">
              <h3>THE ACTORS</h3>
              {movie.cast.slice(0, 4).map((actor) => (
                <Link key={actor.id} to={`/Movie-App/person/${actor.id}`}>
                  <p>{actor.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
