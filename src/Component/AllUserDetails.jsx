/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllUserDetails = ({ refetch, eUser }) => {
  const axiosSecure = useAxiosSecure();
  //approve request=====================

  const handleApprove = (id) => {
    console.log(id);
    axiosSecure.patch(`/approve-user/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Approved",
          text: "Your transaction has been approved",
          icon: "success",
        });
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
        axiosSecure.patch(`/reject-user/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Blocked!",
              text: "Your User has been Blocked.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <tr data-aos="fade-left" data-aos-duration="1000">
      {/* <td>
        <div className="flex-shrink-0">
          <div className="block relative h-10 w-12 ml-4">
            <img
              alt="profile"
              src={eUser?.image_url}
              className="mx-auto object-cover rounded h-full w-full "
            />
          </div>
        </div>
      </td> */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{eUser?.username}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{eUser?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{eUser?.mobileNo}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{eUser?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{eUser?.status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDelete(eUser._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Block</span>
        </button>
        <button
          onClick={() => handleApprove(eUser._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Approve</span>
        </button>
      </td>
    </tr>
  );
};

export default AllUserDetails;
