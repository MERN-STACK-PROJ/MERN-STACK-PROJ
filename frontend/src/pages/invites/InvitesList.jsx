import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import Navbar from "../../components/layout/Navbar";
import { current } from "@reduxjs/toolkit";

const InvitesList = () => {
  const [invites, setInvites] = useState([]);

  // Get userId state from Redux store
  const userId = useSelector((state) => state.userId);

  const getInvites = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/invites/recipient/${userId}`
      );
      console.log("Invites response: ", response);
      setInvites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvites();
  }, []);

  useEffect(() => {
    console.log("Invites in state: ", invites);
  }, [invites]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-4">
        <table className="w-3/4 border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md w-[400px]">
                From
              </th>
              <th className="border border-slate-600 rounded-md pl-3">Kind</th>
              <th className="border border-slate-600 rounded-md w-[175px] pl-3">
                Status
              </th>
              {/* max-md:hidden hides this column on mobile devices and tablets */}
              <th className="border border-slate-600 rounded-md w-[180px]">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log("Invites in JSX", invites)} */}
            {invites?.map((invite) => (
              <tr key={invite._id}>
                <td>
                  <img
                    className="rounded-full mr-4 float-left"
                    width="50"
                    height="50"
                    src={invite.sender.profilePicture}
                    alt="profile picture"
                  />
                  <div className="flex flex-col">
                    <div>
                      <span className="text-xl mr-4 text-gray-500">
                        {invite.sender.firstName} {invite.sender.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-xl mr-4 text-blue-500">
                        &#64;{invite.sender.username}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    {invite.kind === "company_ownership" ? (
                      <span>Ownership {invite.company.name}</span>
                    ) : invite.kind === "friend_request" ? (
                      <span>Friend Request</span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        ERROR: Invite kind is unknown!
                      </span>
                    )}
                  </span>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    {invite.status}
                  </span>
                </td>
                <td>
                  <span className="text-xl mr-4 text-gray-500">
                    <button>Accept</button>
                    <button>Decline</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitesList;
