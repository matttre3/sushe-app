import React from "react";
import sushetext from "../assets/sushe-text.png";
import { useState } from "react";

const MyOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dishQuantity, setDishQuantity] = useState(1);
  const [dishNumber, setDishNumber] = useState("");

  function openModal() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    console.log(dishNumber);
    console.log(dishQuantity); //LI POSSIEDO ENTRAMBI. FUNZIONA <3
    setIsOpen(false);
    //QUA VA LA RICHIESTA POST CHE MANDA NUMERO E QUANTITA
    setDishQuantity(1);
    document.body.style.overflow = "scroll";
  }

  function saveDish(e) {
    let dish = e.target.value;
    setDishNumber(dish);
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
    <>
      <div className="flex flex-col items-center bg-sushe-lg fixed top-0 w-full z-50">
        <img className="w-[80px] mt-3 mb-3" src={sushetext} alt="text-logo" />
        <div className="flex justify-center items-center gap-10 mb-3">
          <p className="font-bold text-xl color-sushe-dg">Your Orders</p>
          <p className="text-xl color-sushe-dg">Table Orders</p>
        </div>
      </div>
      <div className="mt-24">
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>casdasiao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-1 bg-slate-100 backdrop-blur-[2px] bg-opacity-50 "
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
                placeholder=""
              />
              <p className="color-sushe-dg font-semibold text-m mb-3">
                Quantity
              </p>
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
                onClick={closeModal}
                className="font-bold text-l color-sushe-dg bg-sushe-mg rounded-md w-16 p-1"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={openModal}
        className=" z-49 fixed font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 bottom-4 right-4"
      >
        {" "}
        + New Dish
      </button>
    </>
  );
};

export default MyOrder;
