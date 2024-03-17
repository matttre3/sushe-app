import React from "react";
import { useState } from "react";
import axios from "axios";

const AddModal = ({ closeModal, setRefresh, userName, tableNumber }) => {
  const [dishQuantity, setDishQuantity] = useState(0);
  const [dishNumber, setDishNumber] = useState("");
  function saveDish(e) {
    let dish = e.target.value;
    setDishNumber(dish);
  }

  function addOrder() {
    console.log(dishNumber);
    console.log(dishQuantity);

    axios
      .post("http://localhost:3000/add-dish", {
        dishNumber: dishNumber,
        dishQuantity: dishQuantity,
        userName: userName,
        tableNumber: tableNumber,
      })
      .then((response) => {
        console.log(response);
        setRefresh(true);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function editQuantity(e) {
    const sign = e.target.innerText;
    let newQuantity;

    if (sign === "+") {
      newQuantity = dishQuantity + 1;
    } else if (dishQuantity > 1) {
      newQuantity = dishQuantity - 1;
    } else {
      newQuantity = 1;
    }

    setDishQuantity(newQuantity);
  }

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-1 bg-slate-100 backdrop-blur-sm bg-opacity-50 "
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-sushe-lg p-8 rounded-lg shadow-lg flex flex-col items-center justify-center w-full ml-4 mr-4"
        >
          <p className="color-sushe-dg font-semibold text-xl mb-4">
            DISH NUMBER
          </p>
          <input
            onChange={saveDish}
            className="bg-zinc-200 m-1 rounded-xl  p-3 w-24 mb-5 input"
            type="number"
            name="dish"
            id="dish"
            value={dishNumber}
            placeholder=""
          />
          <p className="color-sushe-dg font-semibold text-m mb-3">Quantity</p>
          <div className="flex items-center justify-center mb-3">
            <button
              onClick={editQuantity}
              className="font-bold text-2xl color-sushe-dg bg-sushe-mg rounded-md w-7 h-7"
            >
              -
            </button>
            <p className="font-bold text-3xl color-sushe-dg ml-4 mr-4">
              {dishQuantity}
            </p>
            <button
              onClick={editQuantity}
              className="font-bold text-2xl color-sushe-dg bg-sushe-mg rounded-md w-7 h-7"
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              addOrder();
              setDishQuantity(1);
              document.body.style.overflow = "scroll";
            }}
            className="font-bold text-l color-sushe-dg bg-sushe-mg rounded-md w-16 p-1"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
