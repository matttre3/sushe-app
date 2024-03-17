import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import sushetext from "../assets/sushe-text.png";
import { useRedirect } from "../hooks/useRedirect";

const AllOrder = () => {
  const navigate = useNavigate();

  const { tableNumber } = useParams();

  return (
    <>
      <div className="flex flex-col items-center bg-sushe-lg fixed top-0 w-full z-50">
        <img className="w-[80px] mt-3 mb-3" src={sushetext} alt="text-logo" />
        <p
          onClick={() => {
            navigate("/joincreate");
          }}
          className="text-sm text-red-900 font-semibold"
        >
          Quit Table
        </p>
        <div className="flex justify-center items-center gap-10 mb-3">
          <p
            onClick={() => {
              navigate(`/${tableNumber}/myorder`);
            }}
            className="text-xl color-sushe-dg"
          >
            Your Orders
          </p>
          <p className="font-bold text-xl color-sushe-dg">Table Orders</p>
        </div>
      </div>
    </>
  );
};

export default AllOrder;
