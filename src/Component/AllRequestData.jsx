/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllRequestData = ({ refetch, asset }) => {
  const axiosSecure = useAxiosSecure();

  //approve request=====================

  const handleApprove = (id) => {
    // console.log(id);
    axiosSecure.patch(`/approve-request/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId > 0) {
        refetch();
        Swal.fire({
          title: "Approved",
          text: "Your transaction has been approved",
          icon: "success",
        });
      }
    });
    axiosSecure.delete(`/reject-request/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
      }
    });
  };

  //reject request========================xxxxxxxxxxxxxxxxx

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reject-request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.mobileNo}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.senderEmail}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.type}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.totalAmount}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.percentage}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDelete(asset._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Reject</span>
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleApprove(asset._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Approve</span>
        </button>
        {/* Update Modal */}
      </td>
    </tr>
  );
};

export default AllRequestData;
