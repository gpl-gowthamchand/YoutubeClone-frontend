import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/darkModeSlice";

function DarkModeButton() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Assuming darkMode state exists

  return (
    <button
      className="pr-4 flex items-center gap-2"
      onClick={() => {
        dispatch(setDarkMode());
      }}
    >
      <img
        src={isDarkMode ? "./assets/darkMode.png" : "./assets/lightMode.png"}
        alt={isDarkMode ? "Dark Mode Icon" : "Light Mode Icon"}
        className="w-6 h-6"
      />
      Switch Theme
    </button>
  );
}

export default DarkModeButton;
