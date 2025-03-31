import React, { useState } from "react";
import Menu from "../assets/Menu";
import logo from "../assets/ytLogo.png";
import logoDark from "../assets/ytLogo-dark.png";

import { Link } from "react-router-dom";
import { setSidebarExtendedValue } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import DarkModeButton from "./DarkModeButton";
import { debounce } from "lodash";
import { AiOutlineAudio, AiOutlineBell, AiOutlinePlus } from "react-icons/ai"; // Import microphone, bell, and plus icons

function Navbar({ sidebarExtended, setSidebarExtended }) {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useSelector((state) => state.category);
  const channelLoading = useSelector((state) => state.channel.isLoading);
  const videoLoading = useSelector((state) => state.video.isLoading);
  const searchLoading = useSelector((state) => state.search.isLoading);
  const { darkMode } = useSelector((state) => state.darkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notifications
  const notifications = [
    "Channel A uploaded a new video.",
    "Channel B started a live stream.",
    "Channel C posted a new community update.",
  ]; // Example notifications

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      pageRoute(`/search/${searchValue}`);
      setSearchValue(""); // Clear the input field
    }
  };

  const debouncedSetSearchValue = debounce((value) => setSearchValue(value), 300);

  return (
    <>
      <div
        className={`h-[50px] fixed z-10 w-[100%] ${
          darkMode ? "bg-dark text-white" : "bg-white"
        }`}
      >
        {videoLoading || channelLoading || isLoading || searchLoading ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="error" />
          </Stack>
        ) : (
          ""
        )}

        <nav className="flex justify-between">
          <div className="flex h-[60px] items-center space-x-2 lg:space-x-20 xl:space-x-64">
            <div className="flex items-center space-x-4 ml-3 -mt-4 pl-2">
              <button
                aria-label="Toggle Sidebar"
                onClick={() => {
                  dispatch(setSidebarExtendedValue(!sidebarExtended));
                  setSidebarExtended(!sidebarExtended);
                }}
              >
                <Menu />
              </button>
              <Link to="/">
                {darkMode ? (
                  <img className="w-24 ml-4" src={logoDark} alt="" />
                ) : (
                  <img className="w-32" src={logo} alt="" />
                )}
              </Link>
            </div>
            <form onSubmit={handleOnSubmit} className="-mt-3 flex items-center gap-3">
              <div className="relative w-[250px] sm:w-[500px]"> {/* Increased width */}
                <input
                  onChange={(e) => debouncedSetSearchValue(e.target.value)}
                  value={searchValue}
                  type="search"
                  name="search"
                  id="default-search"
                  className={`block p-2 pl-10 w-full text-sm ${
                    darkMode ? "text-white bg-dark" : "text-black bg-gray-50"
                  } rounded-full border-[1px] border-[#cccccc] focus:outline-none`} // Adjusted for dark mode
                  placeholder="Search"
                  aria-label="Search"
                  required
                />
                <button
                  type="submit"
                  aria-label="Submit Search"
                  className={`text-white absolute right-0 bottom-0 top-0 font-medium text-sm px-4 py-2 ${
                    darkMode ? "bg-dark" : "bg-[#f8f8f8]"
                  } border-[1px] border-[#cccccc] rounded-r-full`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button
                aria-label="Voice Search"
                className="flex items-center justify-center px-3"
              >
                <AiOutlineAudio className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4 pr-4">
            <DarkModeButton />
            <button
              aria-label="Create"
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-full"
            >
              <AiOutlinePlus className="w-5 h-5 text-black dark:text-white" />
              <span className="text-sm font-medium text-black dark:text-white">
                Create
              </span>
            </button>
            <div className="relative">
              <button
                aria-label="Notifications"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600"
                onClick={() => setNotificationsOpen(!notificationsOpen)} // Toggle notifications window
              >
                <AiOutlineBell className="w-5 h-5 text-black dark:text-white" />
              </button>
              {notificationsOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          {notification}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                aria-label="Profile"
                className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* Placeholder for profile icon */}
                <span className="text-sm font-bold text-black dark:text-white">
                  P
                </span>
              </button>
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="px-4 py-2 font-bold">Profile Name</li>
                    <li className="px-4 py-2 text-gray-500">email@example.com</li>
                    <hr className="my-2 border-gray-300 dark:border-gray-600" />
                    <li className="px-4 py-2 text-blue-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Create a channel
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Google Account
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Switch account
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Sign out
                    </li>
                    <hr className="my-2 border-gray-300 dark:border-gray-600" />
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      YouTube Studio
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Purchases and memberships
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Your data in YouTube
                    </li>
                    <hr className="my-2 border-gray-300 dark:border-gray-600" />
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Appearance: Device theme
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Language: English
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Restricted Mode: Off
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Location: India
                    </li>
                    <hr className="my-2 border-gray-300 dark:border-gray-600" />
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Keyboard shortcuts
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Settings
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Help
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Send feedback
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
