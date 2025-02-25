import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CashOut = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const mobileNo = form.MobileNo.value;
    const amount = form.amount.value;
    const password = form.password.value;
    const percentage = (parseInt(amount) * 1.5) / 100;
    let totalAmount = parseInt(amount) + percentage;
    console.log(totalAmount);

    const transactionData = {
      mobileNo,
      totalAmount,
      password,
      senderEmail: user.email,
      type: 'Cash Out',
      percentage,
    };
    console.log(transactionData);
    const assetRes = await axiosSecure.post('/cash-out', transactionData);
    console.log(assetRes.data);
    if (assetRes.data.insertedId) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your cash-out req. has been send',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-64 lg:w-96 mx-auto lg:border-2 rounded-2xl lg:border-slate-200 lg:p-10">
      {/* <p className="text-3xl font-bold text-center pb-3">
        S-<span className="text-blue-600">Kash</span>
      </p> */}
      <img className="w-28 h-14" src="PH-Cash.png" alt="" />
      <h1 className="text-center text-2xl font-semibold mt-4">Cash Out</h1>
      <p className="text-center pb-4">From Agent Only</p>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-4">
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
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm mb-2">
                Amount
              </label>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              required
              placeholder="Amount"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
            />
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
    </div>
  );
};

export default CashOut;
