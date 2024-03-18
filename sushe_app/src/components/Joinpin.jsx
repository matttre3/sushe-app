import React, { useState } from "react";
import sushetext from "../assets/sushe-text.png";
import sushelogo from "../assets/sushe-logo.png";
import { useNavigate } from "react-router-dom";
import blob from "../assets/blob.svg";
import chevronleft from "../assets/chevron-left.svg";
import axios from "axios";

const JoinPin = ({ setTablePin }) => {
  const navigate = useNavigate();

  function checkLoginTable() {
    axios
      .post("http://localhost:3000/checklogintable", {
        loginTableNumber: loginTableNumber,
        loginTablePin: loginTablePin,
      })
      .then((response) => {
        if (response.data.check == true) {
          setTablePin(loginTablePin);
          navigate(`/${loginTableNumber}/myorder`);
        } else {
          console.log("hai sbagliato qualcosa fratmo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [loginTableNumber, setLoginTableNumber] = useState();
  const [loginTablePin, setLoginTablePin] = useState();

  return (
    <>
      <button
        onClick={() => {
          navigate("/joincreate");
        }}
        className="z-50 flex justify-center items-center font-bold text-md color-sushe-lg rounded-xl max-w-10 max-h-10 w-auto p-2 bottom-4 right-4 absolute top-2 left-2"
      >
        <img src={chevronleft} alt="" />
      </button>
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
        <div className="mt-20 flex flex-col justify-center items-center">
          <input
            onChange={(e) => {
              setLoginTableNumber(e.target.value);
            }}
            className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input"
            type="number"
            name="tableNumber"
            id="tableNumber"
            placeholder="TABLE NUMBER"
          />
          <input
            onChange={(e) => {
              setLoginTablePin(e.target.value);
            }}
            className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input"
            type="number"
            name="pin"
            id="pin"
            placeholder="PIN"
          />
          <button
            onClick={checkLoginTable}
            className="font-bold text-md color-sushe-dg bg-sushe-lg rounded-xl p-2 w-32"
          >
            Accedi
          </button>
        </div>
      </div>
    </>
  );
};

export default JoinPin;
