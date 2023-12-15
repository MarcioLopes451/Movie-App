import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import rating from "../../images/216411_star_icon (2).png";

export default function ActorMovies() {
  const [actor, setActor] = useState(null);
  const [movie, setMovie] = useState(null);
  const { actorId } = useParams();
  const apiKey = "62c0121e68188863d4bc023757512a1c";
  const actorUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`;
  const actorMovieUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}`;

  useEffect(() => {
    fetch(actorUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActor(data);
      })
      .catch((err) => console.error("error " + err));
  }, [actorUrl]);

  useEffect(() => {
    fetch(actorMovieUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((err) => console.error("error " + err));
  }, [actorMovieUrl]);

  return (
    <div className="mt-5">
      {actor ? (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt="movie poster"
            className="w-[300px] h-[500px] rounded-lg"
          />
          <p>{actor.name}</p>
          <p>Place of Birth: {actor.place_of_birth}</p>
          <div>
            <h3>biography</h3>
            <p>{actor.biography.slice(0, 300)}</p>
          </div>

          <div className="mt-5">
            {movie ? (
              <div className="flex justify-center items-center flex-col flex-wrap">
                <h3>The Movies {actor.name} has featured in</h3>
                {movie.cast.slice(0, 10).map((movies) => (
                  <div key={movies.id}>
                    <Link to={`/Movie-App/movie/${movies.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                        alt="poster"
                        className="w-[150px] h-[255px] rounded-lg"
                      />
                      <h3 className="text-center w-[150px]">{movies.title}</h3>
                      <div className="flex items-center justify-center">
                        <img
                          src={rating}
                          alt="star rating"
                          className="w-[30px] h-[30px]"
                        />
                        <h3>{movies.vote_average}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
