import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AllOrderRow = ({ data, chevronbutton }) => {
  const [orderDetails, setOrderDetails] = useState();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const { tableNumber } = useParams();

  useEffect(() => {
    function getOrderDetails() {
      axios
        .get(
          `http://localhost:3000/get-order-details?tableNumber=${tableNumber}`
        )
        .then((response) => {
          setOrderDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getOrderDetails();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between p-3">
        <ul className="flex flex-row gap-3">
          <li className="font-semibold text-xl rounded-xl bg-slate-200 p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
            {data.dish}
          </li>
          <li className="font-semibold text-xl rounded-xl bg-slate-200 p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
            {data.total_quantity}
          </li>
        </ul>

        <button
          onClick={() => {
            setDetailModalOpen((prevState) => !prevState);
          }}
          className="flex justify-center items-center font-bold text-md color-sushe-dg bg-sushe-lg rounded-xl min-w-10 min-h-10 w-auto p-2 bottom-4 right-4"
        >
          <img src={chevronbutton} alt="" />
        </button>
      </div>
      <div className="pb-2">
        {orderDetails &&
          detailModalOpen &&
          orderDetails
            .filter((dish) => dish.dish === data.dish)
            .map((dish, index) => {
              return (
                <div className="flex flex-row justify-between pl-3 p-1">
                  <ul className="flex flex-row gap-3">
                    <li className="font-semibold text-xl rounded-xl bg-sushe-lg p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
                      {dish.total_quantity}
                    </li>
                    <li className="font-semibold text-xl rounded-xl  p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
                      {dish.username}
                    </li>
                  </ul>
                </div>
              );
            })}
      </div>
      <hr></hr>
    </>
  );
};

export default AllOrderRow;
