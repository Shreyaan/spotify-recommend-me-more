/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Navbar({
  imgSrc,
  name,
  email,
}: {
  imgSrc: string;
  name?: string;
  email?: string;
}) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="../"><img src="/logo.png" alt="" width={120} height={100} /></a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src={imgSrc}
              width={20} 
              height={20} 
              alt="user image"/>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
