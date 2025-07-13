"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = ({ token }: { token: string }) => {
  const navigator = useRouter();
  const logOut = () => {
    console.log("ok");

    if (window) {
      window.localStorage.removeItem("TEA_USER");
      window.localStorage.removeItem("TEA_TOKEN");
      navigator.push("/signin");
    }
  };
  return (
    <header className='z-10 bg-purple-900 px-3 py-3 mb-8 sticky top-0 '>
      <div className='mx-auto max-w-5xl flex items-center justify-between gap-6'>
        <p className='font-dancing-script text-white text-lg'>Tea Spot</p>
        {token ? (
          <button
            onClick={() => logOut()}
            type='button'
            className='bg-white text-purple-900 px-7 py-2 rounded-full text-sm'
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigator.push("/signin")}
            type='button'
            className='bg-white text-purple-900 px-7 py-2 rounded-full text-sm'
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
