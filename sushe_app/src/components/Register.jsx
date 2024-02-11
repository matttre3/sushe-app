import React from "react";
import sushetext from "../assets/sushe-text.png";
import sushelogo from "../assets/sushe-logo.png";
import blob from "../assets/blob.svg";
import { Link } from "react-router-dom";

const Register = () => {
  function setName(e) {
    setUserName(e.target.value);
  }

  function setPsw(e) {
    setPassword(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="flex flex-col items-center overflow-hidden relative">
        <img
          className="-mt-[300px] absolute min-w-[700px] md:min-w-[1000px] md:-mt-[700px] spin-image"
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
            Registrati ora!
          </h2>
          <form
            className="flex-col flex-wrap items-center justify-center flex mb-6"
            action=""
          >
            <input
              className="bg-zinc-200 m-1 rounded-xl  p-3 w-[250px] mb-5 input"
              onChange={setName}
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
            />
            <input
              className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input"
              onChange={setPsw}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              className="bg-zinc-200 rounded-xl p-3 w-[250px] mb-5 input"
              onChange={setPsw}
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Conferma Password"
            />
            <button
              onClick={submitForm}
              className="font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 w-[100px]"
            >
              Registrati
            </button>
          </form>
          <Link to="/">
            {" "}
            <p className="underline font-medium text-md color-sushe-dg">
              Hai già un account? Accedi qui!
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
