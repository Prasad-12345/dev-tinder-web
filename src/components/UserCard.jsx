// import axios from "axios";
// import React from "react";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeRequest } from "../utils/requestSlice";
// import { removeFeed } from "../utils/feedSlice";
// import { Link } from "react-router-dom";

// function UserCard({ user, connection = false, request = false }) {
//   const { firstName, lastName, age, photoUrl, gender, about, skills } = user;
//   const dispatch = useDispatch();

//   const reviewRequest = async (status, id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/review/" + status + "/" + id,
//         {},
//         { withCredentials: true }
//       );
//       console.log(res);
//       dispatch(removeRequest(res?.data?.data?._id));
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       console.log(res?.data?.data?.toUserId);
//       dispatch(removeFeed(res?.data?.data?.toUserId));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div>
//       <div className="card bg-base-300 sm:max-w-sm md:max-w-md lg:max-w-lg w-full shadow-sm overflow-auto">
//         <figure>
//           <img src={photoUrl} alt="photo" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{firstName + " " + lastName}</h2>
//           {age && gender && <p>{age + ", " + gender}</p>}
//           <p>{about}</p>
//           {!connection ? (
//             <div className="card-actions justify-center my-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={
//                   request
//                     ? () => reviewRequest("rejected", request)
//                     : () => handleSendRequest("ignored", user._id)
//                 }
//               >
//                 {request ? "Reject" : "Ignore"}
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={
//                   request
//                     ? () => reviewRequest("accepted", request)
//                     : () => handleSendRequest("interested", user._id)
//                 }
//               >
//                 {request ? "Accept" : "Interested"}
//               </button>
//             </div>
//           ) : (
//             <Link to={"/chat/" + user._id}>
//               <button className="btn btn-primary">Chat</button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserCard;

import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { removeFeed } from "../utils/feedSlice";
import { Link } from "react-router-dom";

function UserCard({ user, connection = false, request = false }) {
  const { firstName, lastName, age, photoUrl, gender, about, skills } = user;
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(res?.data?.data?._id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(res?.data?.data?.toUserId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center w-full px-4 overflow-auto">
      <div className="card bg-base-300 w-full sm:w-80 md:w-96 lg:w-96 shadow-md overflow-hidden">
        <figure className="w-full h-48 overflow-hidden">
          <img
            src={photoUrl || "/default-profile.png"}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body flex flex-col gap-2">
          <h2 className="card-title text-lg sm:text-xl">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p className="text-sm sm:text-base text-gray-600">{age + ", " + gender}</p>
          )}
          <p className="text-sm sm:text-base text-gray-700">{about}</p>

          {!connection ? (
            <div className="card-actions flex flex-col sm:flex-row justify-center gap-2 my-4">
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={
                  request
                    ? () => reviewRequest("rejected", request)
                    : () => handleSendRequest("ignored", user._id)
                }
              >
                {request ? "Reject" : "Ignore"}
              </button>
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={
                  request
                    ? () => reviewRequest("accepted", request)
                    : () => handleSendRequest("interested", user._id)
                }
              >
                {request ? "Accept" : "Interested"}
              </button>
            </div>
          ) : (
            <Link to={`/chat/${user._id}`} className="mt-2">
              <button className="btn btn-primary w-full">Chat</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
