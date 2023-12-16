import Logo from "../../../images/7511679_ball_dragon_game_movie_icon.png";
import { Link } from "react-router-dom";
import Instagram from "../../../images/1161953_instagram_icon.png";
import Twitter from "../../../images/5305170_bird_social media_social network_tweet_twitter_icon.png";
import Facebook from "../../../images/317727_facebook_social media_social_icon.png";

export default function Footer() {
  return (
    <div className="mt-[100px]">
      <div className="flex justify-center items-center gap-10 flex-col flex-wrap font-Inria-Serif">
        <img src={Logo} className="w-[70px] h-[70px]" />
        <div className="flex justify-between items-center text-xl gap-10">
          <Link to="/Movie-App/">Home</Link>
          <Link to="/Movie-App/TopRatedMovies">Top-Rated</Link>
          <Link to="/Movie-App/UpComingMovies">Up-Coming</Link>
        </div>
        <p className="text-xl italic">
          don’t live a little, Live a{" "}
          <span className="font-bold underline">Cineplex</span>.
        </p>
        <div className="flex gap-5 items-center">
          <img src={Instagram} className="w-[40px] h-[40px]" />
          <img src={Twitter} className="w-[40px] h-[40px]" />
          <img src={Facebook} className="w-[40px] h-[40px]" />
        </div>
        <p>Copyright 2023. All Rights Reserved</p>
      </div>
    </div>
  );
}
