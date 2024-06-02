import  { useEffect, useState } from "react";
import { logout } from "@/Redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Navigation = () => {
  const [clicked,setClicked] = useState(false);
  const [clicked1,setClicked1] = useState(false);
  const [pic,setPic] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(data as string) || null;
    setPic(userInfo?.pic);
  })
  return (
    <>
      <nav className=" bg-gray-800 h-10">
        <div className="mx-auto h-10 max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-9 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setClicked1(!clicked1)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
              <div className="flex flex-row flex-shrink-0 items-center">
                <Link to="/home">
                <div className="flex flex-row justify-center align-middle text-center">
                <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                </div>
                <div>
                <h1 className=" px-6 py-2 text-white font-semibold text-lg text-center">
                  HelpPro
                </h1>
                </div>
                </div>
                </Link>
              </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end text-center align-middle">
              <div className="hidden sm:ml-6 sm:block text-center align-middle" >
                <div className="flex space-x-4 text-center align-middle">
                  <a
                    href="/home"
                    className=" text-white rounded-md px-3 py-5 text-sm font-medium"
                    aria-current="page"
                  >
                    <span>Home</span>
                  </a>
                  <a
                    href="/allprofiles"
                    className="text-gray-300  hover:text-white rounded-md px-3 py-5 text-sm font-medium"
                  >
                    Profiles
                  </a>
                  <a
                    href="/chats"
                    className="text-gray-300  hover:text-white rounded-md px-3 py-5 text-sm font-medium"
                  >
                    Chats
                  </a>
                  <a
                    href="/addnewpost"
                    className="text-gray-300  hover:text-white rounded-md px-3 py-4 text-sm font-medium"
                  >
                    <Button className=" h-[30px] bg-white text-black hover:text-white">Add new Post</Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setClicked(!clicked)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={pic}
                      alt=""
                    />
                  </button>
                </div>

                {
                  clicked && (
                    <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  
                >
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    onClick={() => {dispatch(logout())}}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
                  )
                }

                
              </div>
            </div>
          </div>
        </div>
        {
          clicked1 && (
            <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Team
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Calendar
              </a>
            </div>
          </div>
          )
        }

      </nav>
    </>
  );
};

export default Navigation;
