import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { register } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.name.value;
    const email = form.email.value;
    const mobileNo = form.MobileNo.value;
    const password = form.password.value;
    const role = form.type.value;
    const nid = form.nid.value;
    // const image = form.image.files[0];

    try {
      // const image_url = await imageUpload(image);

      const hrData = {
        username,
        email,
        password,
        role,
        nid,
        // image_url,
        mobileNo,
      };
      console.log(hrData);
      const res = await register(hrData);
      if (res.success) {
        form.reset();
        toast.success("Successfully Registered!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center max-w-full min-h-screen pt-16">
      <div className="flex flex-col max-w-lg p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <img className="w-28 h-14" src="PH-Cash.png" alt="" />
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm text-gray-400">Welcome to PH-Cash</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            {/* <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div> */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="nid" className="text-sm mb-2">
                  NID
                </label>
              </div>
              <input
                type="tel"
                name="nid"
                id="nid"
                required
                placeholder="NID number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Mobile Number
                </label>
              </div>
              <input
                type="tel"
                name="MobileNo"
                id="phone"
                required
                placeholder="phone number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700 " htmlFor="category">
                Type
              </label>
              <select
                name="type"
                id="type"
                className="border p-2 rounded-md bg-gray-200 text-gray-900"
              >
                <option value="">Select Type</option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Pin
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="5-digit PIN"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-400 w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-text-400 text-blue-600  "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
