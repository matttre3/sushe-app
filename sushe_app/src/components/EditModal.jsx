import React from "react";
import { useState } from "react";
import axios from "axios";

const EditModal = ({ closeModal, order, refreshOrders }) => {
  const [dishQuantity, setDishQuantity] = useState(order.quantity);
  const [dishNumber, setDishNumber] = useState(order.dish);
  console.log(order);

  function saveDish(e) {
    let dish = e.target.value;
    setDishNumber(dish);
  }

  function editOrder() {
    axios
      .patch("http://localhost:3000/edit-order", {
        id: order.id,
        dishNumber: dishNumber,
        dishQuantity: dishQuantity,
      })
      .then((response) => {
        console.log(response);
        refreshOrders();
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
    document.body.style.overflow = "scroll";
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
              editOrder();
              setDishQuantity(1);
              document.body.style.overflow = "scroll";
            }}
            className="font-bold text-l color-sushe-dg bg-sushe-mg rounded-md w-16 p-1"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
