import useAuth from "../../hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import AllRequestData from "../../Component/AllRequestData";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const TransactionManagement = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const {
    data: reqData = [],

    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axiosCommon(
        `/transaction-management/${user?.email}`
      );
      // console.log(data);
      return data;
    },
    queryKey: ["reqData", user],
  });
  // console.log("reqData:", reqData);

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-center uppercase lg:mt-7">
        ---Transaction Request---
      </h2>
      <div className="py-8">
        <div className=" sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Number of Requester
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Email of Requester
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Transaction Type
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Sending Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    My Percetage
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Reject
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Approve
                  </th>
                </tr>
              </thead>
              <tbody>
                {reqData?.map((asset) => (
                  <AllRequestData
                    key={asset?._id}
                    refetch={refetch}
                    asset={asset}
                  ></AllRequestData>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;
