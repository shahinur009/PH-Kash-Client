import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SystemMonitoring = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: reqData = [],

    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure(`/system-monitoring`);
      console.log(data);
      return data;
    },
    queryKey: ['reqData', user],
  });
  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-center uppercase lg:mt-7">
        ---System Monitoring---
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
                    Transaction Id
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Mobile No.
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
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Sender Email
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-blue-400  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                  >
                    Reciever Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {reqData?.map(asset => (
                  <tr key={asset._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?._id}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?.mobileNo}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?.type}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?.totalAmount}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?.senderEmail}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {asset?.receiverEmail}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;
