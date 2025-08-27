import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

function Premiun() {
  const [isPremium, setIspremium] = useState(false);
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIspremium(true);
    }
  };
  const handleBuyClick = async () => {
    const res = await axios.post(
      BASE_URL + "/payment/create",
      {},
      { withCredentials: true }
    );
    console.log(res);
    const { keyId, payment } = res.data;
    const { amount, currecy, orderId, notes } = payment;
    const options = {
      key: keyId,
      amount: amount,
      currency: currecy,
      name: "Dev Tinder",
      description: "Connect with developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    verifyPremiumUser()
  }, [])

  return !isPremium ? (
    <div className="flex justify-center my-10">
      <div className="card w-98 bg-base-300 card-xs shadow-sm">
        <div className="card-body">
          <h2 className="text-xl">Buy Premium Membership</h2>
          <ul className="px-10">
            <li className="text-lg">- Chat with other people</li>
            <li className="text-lg">- Infinite connection request per day</li>
            <li className="text-lg">- Blue Tick</li>
            <li className="text-lg">- Valid for 3 months</li>
          </ul>
          <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={handleBuyClick}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="font-bold text-2xl text-center my-10">You are already a premium user</h1>
  );
}

export default Premiun;
