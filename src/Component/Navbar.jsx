import React, { useState } from "react";
// import logo from '';
import { GoArrowUpRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";
import UserMenue from "../Menue/UserMenue";
import AgentMenue from "../Menue/AgentMenue";
import AdminMenue from "../Menue/AdminMenue";

const Navbar = () => {
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [balanceOpen, setBalanceOpen] = useState(false);
  const role = user?.role;

  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axiosCommon(`/user-balance/${user?.email}`);
      console.log(data);
      return data;
    },
    queryKey: ["userData", user],
  });
  const handleLogout = () => {
    logout();
    console.log("logout");
    navigate("/login");
  };
  const handleBalance = () => {
    refetch();
    setBalanceOpen(!balanceOpen);
    setTimeout(function () {
      setBalanceOpen(false);
    }, 2000);
  };
  return (
    <div className="">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#e5f6ffbe] from-30% via-[#02004307] via-40%  to-[#e5f6ffbe] rounded-t-2xl px-2 ">
        <header className="p-2 dark:bg-gray-100 dark:text-gray-800">
          <div className="container flex justify-between items-center  mx-auto">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Back to homepage"
              className="flex items-center "
            >
              {/* <p className="text-3xl font-bold">
                S-<span className="text-blue-600">Kash</span>
              </p> */}
              <img className="w-36 h-32" src="PH-Cash.png" alt="" />
            </a>
            {user && (
              <div className="relative">
                <button
                  onClick={handleBalance}
                  className="  px-2 py-1 text-[14px] rounded-2xl font-semibold border-2 border-blue-700 text-red-500 "
                >
                  Balance
                </button>
                {balanceOpen && (
                  <div
                    className="absolute rounded-xl shadow-md w-20  bg-blue-400 overflow-hidden right-0 top-0 text-sm duration-5500 py-[6px] scale-110 font-bold text-center "
                    data-aos="slide-right"
                    data-aos-delay="600"
                    data-aos-duration="2500"
                  >
                    $ {userData?.balance}.00
                  </div>
                )}
              </div>
            )}
            <div>
              <div className="items-center flex-shrink-0 hidden lg:flex">
                {user ? (
                  <Link
                    onClick={handleLogout}
                    className="self-center  py-2 border-slate-500  flex justify-center items-center gap-1 border-2 rounded-xl px-3 "
                  >
                    LogOut <GoArrowUpRight />
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="self-center  py-2 border-blue-400  flex justify-center items-center gap-1 border-2 rounded-xl px-3 "
                  >
                    LogIn <GoArrowUpRight />
                  </Link>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 dark:text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                      {/* {role === 'User' && <UserMenue></UserMenue>}
                    {role === 'Agent' && <AgentMenue />}
                    {role === 'Admin' && <AdminMenue />} */}

                      {user ? (
                        <>
                          <div
                            onClick={handleLogout}
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
