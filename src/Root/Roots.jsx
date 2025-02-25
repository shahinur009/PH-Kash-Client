import Navbar from "../Component/Navbar";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import useAuth from "../hooks/useAuth";

const Roots = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <Navbar></Navbar>
      {user ? (
        <div className=" lg:min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto ">
          <div>
            <Dashboard />
          </div>
          <div className="flex-1  ">
            <div className="p-5">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      ) : (
        <div className=" pt-10 ">
          <p className="text-4xl font-bold text-center text-slate-600">
            Welcome to PH-Cash
          </p>
          <div className=" max-w-5xl mx-auto mt-5 ">
            <img
              className="w-full h-[400px] rounded-2xl "
              src="10000tk.gif"
              alt=""
            />
          </div>
          <div className="flex justify-center items-center my-3">
            <Link
              className="px-3 py-2 bg-blue-400 rounded-xl font-semibold text-lg text-red-500"
              to={"/signup"}
            >
              REGISTER
            </Link>
          </div>
          <div className=" max-w-5xl mx-auto mt-5 ">
            <img
              className="w-full h-[400px] rounded-2xl "
              src="40tk.gif"
              alt=""
            />
          </div>
        </div>
      )}
      <hr className="max-w-7xl mx-auto" />
      <div className="py-6 text-sm text-center dark:text-gray-600">
        © 2025 PH-Cash. All rights reserved. @Contact-01744604009
      </div>
    </div>
  );
};

export default Roots;
