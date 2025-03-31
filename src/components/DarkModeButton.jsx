import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/darkModeSlice";
import lightModeIcon from "../assets/lightMode.png";
import darkModeIcon from "../assets/darkMode.png";

function DarkModeButton() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <button
      className="pr-4 flex items-center"
      onClick={() => {
        dispatch(setDarkMode());
      }}
    >
      <img
        src={isDarkMode ? darkModeIcon : lightModeIcon}
        alt={isDarkMode ? "Dark Mode Icon" : "Light Mode Icon"}
        className="w-6 h-6"
      />
    </button>
  );
}

export default DarkModeButton;
