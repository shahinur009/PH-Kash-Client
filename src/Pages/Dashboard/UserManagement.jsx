import { useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AllUserDetails from "../../Component/AllUserDetails";

const UserManagement = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: allUsersData = [], refetch } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure(`/user-management1?search=${search}`);
      console.log("Received data from backend:", data);
      return data; // No need for .result
    },
    queryKey: ["allUsers", user, search],
  });

  const allUsers = allUsersData || [];

  console.log(allUsers);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText);
    // refetch();
    // mutateAsync(search);
  };
  const handleReset = () => {
    setSearch("");
    setSearchText("");
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-4 my-6">
        <form onSubmit={handleSearch}>
          <div className=" p-1 overflow-hidden      focus-within:border-blue-400 ">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent border rounded-lg"
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Enter user name"
              aria-label="Enter user name"
            />

            <button
              type="submit"
              className="px-1 md:px-4 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-400 rounded-md hover:bg-gray-600 focus:bg-[#3facb2] focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
        <button
          onClick={handleReset}
          className="px-1 md:px-4 py-2 text-sm bg-blue-400 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
      <div className="py-8  mx-auto">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Type
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Mobile No.
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Approve/Reject
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((eUser) => (
                  <AllUserDetails
                    key={eUser?._id}
                    eUser={eUser}
                    refetch={refetch}
                  ></AllUserDetails>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
