import React from "react";
import sushetext from "../assets/sushe-text.png";
import sushelogo from "../assets/sushe-logo.png";
import blob from "../assets/blob.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRedirect } from "../hooks/useRedirect";

const Init = ({ userName, setUserName }) => {
  useRedirect("/joincreate", userName);
  const [userNameInput, setUserNameInput] = useState("");
  const navigate = useNavigate();

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
          <h2 className="mt-[60px] font-medium text-xl color-sushe-dg mb-4">
            Inserisci il tuo username!
          </h2>
          <form
            className="flex-col flex-wrap items-center justify-center flex mb-6"
            action=""
          >
            <input
              className="bg-zinc-200 m-1 rounded-xl  p-3 w-[250px] mb-5 input"
              onChange={(e) => setUserNameInput(e.target.value)}
              type="text"
              name="userName"
              value={userNameInput}
              id="userName"
              placeholder="Username"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setUserName(userNameInput);
              }}
              className="font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 w-[90px]"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Init;
