import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Profile = () => {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();
  const userEmail = user?.email?.address;

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail);
    }
  }, [userEmail, fetchUserByEmail]);

  if (!currentUser) {
    return <p className="text-white">Loading user data...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#13131a] p-6">
      <div className="w-full max-w-sm p-6 bg-[#1c1c24] text-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div
            className="h-24 w-24 rounded-full flex items-center justify-center text-white text-4xl mb-4"
            style={{ backgroundColor: currentUser.avatarColor || "#4F46E5" }}
          >
            {currentUser.username?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <h2 className="text-xl font-bold">{currentUser.username}</h2>
          <p className="text-sm text-gray-400">Age: {currentUser.age}</p>
          <p className="text-sm text-gray-400">Location: {currentUser.location}</p>
          <p className="text-sm text-gray-300">{currentUser.bio}</p>

          {/* Interests */}
          {currentUser.interests?.length > 0 && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold">Interests:</h3>
              <p className="text-xs text-gray-400">{currentUser.interests.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
