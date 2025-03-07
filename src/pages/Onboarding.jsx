import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Onboarding = () => {
  const { createUser } = useStateContext();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [avatarColor, setAvatarColor] = useState("#4F46E5"); // Default avatar color
  
  const navigate = useNavigate();
  const { user } = usePrivy();

  // Predefined avatar color options
  const colorOptions = [
    "#4F46E5", // Indigo
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#EC4899", // Pink
  ];

  // Handle form submission and create user profile
  const handleOnboarding = async (e) => {
    e.preventDefault();
    
    // Construct user data object
    const userData = {
      username,
      age: parseInt(age, 10), // Ensure age is stored as a number
      location,
      bio: bio || "No bio provided", // Default bio if empty
      interests: interests ? interests.split(",").map(item => item.trim()) : [], // Convert interests into an array
      avatarColor,
      folders: [], // Initialize empty folders array
      treatmentCounts: 0, // Default count
      folder: [], // Initialize empty folder
      createdBy: user?.email?.address, // Ensure email exists
      joinedDate: new Date().toISOString(), // Store the current date
    };

    console.log("User Data:", userData);
    
    const newUser = await createUser(userData);
    if (newUser) {
      navigate("/profile"); // Redirect to profile page after successful onboarding
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13131a] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-2 text-center text-5xl font-bold text-white">👋 </h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome! Let's get started
        </h2>
        
        {/* Avatar Preview */}
        <div className="mb-6 flex flex-col items-center">
          <div 
            className="h-24 w-24 rounded-full flex items-center justify-center text-white text-4xl mb-4" 
            style={{ backgroundColor: avatarColor }}
          >
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                className="h-8 w-8 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
                onClick={() => setAvatarColor(color)}
                aria-label={`Select ${color} as avatar color`}
              />
            ))}
          </div>
        </div>
        
        {/* Onboarding Form */}
        <form onSubmit={handleOnboarding}>
          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block text-sm text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
              placeholder="Choose a username"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="age" className="mb-2 block text-sm text-gray-300">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="13"
              max="120"
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
              placeholder="Your age"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
              placeholder="City, Country"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="bio" className="mb-2 block text-sm text-gray-300">
              Bio <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
              placeholder="Tell us a bit about yourself"
              rows="3"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="interests" className="mb-2 block text-sm text-gray-300">
              Interests <span className="text-xs text-gray-400">(optional, comma-separated)</span>
            </label>
            <input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
              placeholder="e.g., Reading, Sports, Technology"
            />
          </div>
          
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
