import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import UserMenue from "../../Menue/UserMenue";
import AgentMenue from "../../Menue/AgentMenue";
import AdminMenue from "../../Menue/AdminMenue";

const Dashboard = () => {
  const { user } = useAuth();
  const role = user?.role;
  // console.log(user, role);
  return (
    <div className="max-w-7xl mx-auto ">
      <div className=" p-3 space-y-2 w-full lg:w-64 bg-blue-50 dark:text-gray-800 lg:h-[100vh] ">
        <div className="flex flex-col lg:flex-row items-center p-2 space-x-4 ">
          {/* <img
            src={user?.image_url}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          /> */}
          <div>
            <h2 className="text-lg font-semibold">{user?.username}</h2>
            <p>{user?.mobileNo}</p>
            <p className="  bg-green-300 space-x-1 rounded-2xl p-1 text-center font-bold ">
              {user?.role}
            </p>
          </div>
        </div>

        {role === "User" && <UserMenue></UserMenue>}
        {role === "Agent" && <AgentMenue />}
        {role === "Admin" && <AdminMenue />}
      </div>
    </div>
  );
};

export default Dashboard;
