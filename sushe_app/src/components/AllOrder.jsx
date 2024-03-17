import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import sushetext from "../assets/sushe-text.png";
import { useRedirect } from "../hooks/useRedirect";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AllOrder = () => {
  const navigate = useNavigate();
  const { tableNumber } = useParams();
  const [refresh, setRefresh] = useState(true);
  const [allOrdersData, setAllOrdersData] = useState([]);

  useEffect(() => {
    function getOrdersData() {
      if (refresh) {
        axios
          .get(
            `http://localhost:3000/get-all-orders?tableNumber=${tableNumber}`
          )
          .then((response) => {
            console.log("sto qua");
            setAllOrdersData(response.data);
            setRefresh(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    getOrdersData();
  }, [refresh]);

  return (
    <>
      <div className="flex flex-col items-center bg-sushe-lg fixed top-0 w-full z-50">
        <div className="flex flex-row items-center gap-14">
          <img className="w-[80px] mt-3 mb-3" src={sushetext} alt="text-logo" />
          <p
            onClick={() => {
              navigate("/joincreate");
            }}
            className="text-sm text-red-900 font-semibold"
          >
            Quit Table
          </p>
        </div>
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
      <div className="mt-24">
        {allOrdersData &&
          allOrdersData.map((data, index) => {
            return (
              <Fragment key={index}>
                <ul className="flex flex-row gap-5">
                  <li>{data.dish}</li>
                  <li>{data.total_quantity}</li>
                </ul>
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default AllOrder;
