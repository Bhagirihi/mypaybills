import React from "react";
export const Navbar = () => {
  return (
    <div className="flex flex-row items-end  justify-end px-20 py-10">
      <div className="flex flex-row space-x-10 ">
        <a
          className="bg-[#272A30]  hover:bg-green-800 text-gray-300 px-8 text-sm py-2 rounded-md shadow-xl drop-shadow-2xl"
          href="/signup"
        >
          Register
        </a>

        <a
          className="bg-[#272A30] hover:bg-green-800 text-gray-300 px-8 text-sm py-2 rounded-md shadow-xl drop-shadow-2xl"
          href="/signin"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};
