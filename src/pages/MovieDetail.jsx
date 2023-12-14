import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
        //console.log(data);
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
    <div>
      {movie1 ? (
        <div>
          <h2>{movie1.title}</h2>
          {movie ? (
            <div>
              {movie.cast.slice(0, 4).map((actor) => (
                <p key={actor.id}>{actor.name}</p>
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
