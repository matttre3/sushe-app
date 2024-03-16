import React from "react";
import { useEffect } from "react";
import { useRedirect } from "../hooks/useRedirect";
import { useNavigate } from "react-router-dom";
import sushetext from "../assets/sushe-text.png";
import sushelogo from "../assets/sushe-logo.png";
import blob from "../assets/blob.svg";

const Joincreate = ({ userName, logout }) => {
  useRedirect("/", !userName);
  return (
    <>
      <div className="relative flex flex-col items-center overflow-hidden">
        <img
          className="-mt-[300px] absolute min-w-[700px] md:min-w-[1000px] md:-mt-[700px] spin-image overflow-hidden"
          src={blob}
          alt=""
        />
        <div className="flex-col flex-wrap items-center justify-center flex">
          <img className="mt-[100px] w-[150px]" src={sushelogo} alt="" />
          <img
            className="w-[150px] -mt-[20px]"
            src={sushetext}
            alt="text-logo"
          />
        </div>
        <div className="mt-20">
          <button className="font-bold text-l color-sushe-dg bg-sushe-lg rounded-xl p-2 mt-10 w-72">
            CREA UN TAVOLO
          </button>
          <div className="flex items-center justify-center flex-row mt-5">
            <div className="border-[0.5px] mr-2 w-28"></div>
            <p className="color-sushe-dg font-bold">OR</p>
            <div className="border-[1px] ml-2  w-28"></div>
          </div>
          <button className="font-bold text-l color-sushe-dg bg-sushe-lg rounded-xl p-2 mt-5 w-72">
            ENTRA IN UN TAVOLO
          </button>
        </div>
        <button onClick={logout} className="mt-5">
          Log Out
        </button>
      </div>
    </>
  );
};

export default Joincreate;
