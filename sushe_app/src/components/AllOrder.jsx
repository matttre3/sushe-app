import React from "react";
import sushetext from "../assets/sushe-text.png";

const AllOrder = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-sushe-lg fixed top-0 w-full z-50">
        <img className="w-[80px] mt-3 mb-3" src={sushetext} alt="text-logo" />
        <div className="flex justify-center items-center gap-10 mb-3">
          <p className="text-xl color-sushe-dg">Your Orders</p>
          <p className="font-bold text-xl color-sushe-dg">Table Orders</p>
        </div>
      </div>
      <button
        onClick={openModal}
        className=" z-49 fixed font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 bottom-4 right-4"
      >
        + New Dish
      </button>
    </>
  );
};

export default AllOrder;
