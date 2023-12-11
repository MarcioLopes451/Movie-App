//import React from "react";
import Logo from "../../../images/7511679_ball_dragon_game_movie_icon.png";
import Menu from "../../../images/134216_menu_lines_hamburger_icon.png";

export default function MobileNavbar() {
  return (
    <div className="mt-[20px] mx-[20px]">
      <div className="flex justify-between items-center">
        <img src={Logo} className="w-[70px] h-[70px]" />
        <img src={Menu} className="w-[70px] h-[70px]" />
      </div>
    </div>
  );
}
