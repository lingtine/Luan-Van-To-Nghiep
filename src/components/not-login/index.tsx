import React from "react";
import { Link } from "react-router-dom";

export default function NotLogin() {
  return (
    <div
      id="bill"
      className="container flex top-0 right-0 justify-center  mx-auto mb-20 min-w-[100vw] min-h-[500px] z-50 transition ease-in-out delay-150"
    >
      <div className=" flex flex-col justify-center gap-4 w-fit max-w-[600px] h-full float-right z-50 bg-white-200 transition ease-in-out delay-150">
        <div>
          <svg
            width="400px"
            height="400px"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M174.522 256.651C194.539 174.648 297.627 243.479 281.686 248.967C251.051 259.512 216.353 256.229 184.941 264.34"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M157.652 131.7C217.581 174.321 231.104 137.379 137.112 177.614"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M302.059 130C280.527 142.551 262.389 151.266 247.643 156.145C270.319 167.471 288.458 174.628 302.059 177.614"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M129.551 201.421C45.0905 301.162 157.534 270.723 152.233 238.218C150.379 226.873 135.421 211.909 129.551 201.421Z"
              stroke="#000000"
              stroke-opacity="0.9"
              stroke-width="16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span className="text-3xl font-bold ">
          Vui lòng đăng nhập để tiếp tục...
        </span>
        <Link
          to="/login"
          className="text-center rounded-lg text-white  text-xl bg-primary-1 px-6 py-3 hover:bg-transparent border border-transparent hover:border-primary-1 hover:text-black "
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
