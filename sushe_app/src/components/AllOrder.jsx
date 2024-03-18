import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import sushetext from "../assets/sushe-text.png";
import { useRedirect } from "../hooks/useRedirect";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import chevronbutton from "../assets/chevron.svg";
import refreshbutton from "../assets/refresh.svg";
import editbutton from "../assets/edit.svg";
import quitbutton from "../assets/quittable.svg";
import AllOrderRow from "./AllOrderRow";

const AllOrder = () => {
  const navigate = useNavigate();
  const { tableNumber } = useParams();
  const [refresh, setRefresh] = useState(true);
  const [allOrdersData, setAllOrdersData] = useState([]);
  const pin = localStorage.getItem("tablePin");

  useEffect(() => {
    function getOrdersData() {
      if (refresh) {
        axios
          .get(
            `http://localhost:3000/get-all-orders?tableNumber=${tableNumber}`
          )
          .then((response) => {
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
        <div className="flex flex-row items-center p-3 justify-center w-full pl-11 pr-11">
          <div className="flex gap-4">
            <div className="color-sushe-dg items-center flex flex-col">
              <span>Table</span> <strong>{tableNumber}</strong>
            </div>
            <div className="color-sushe-dg items-center flex flex-col">
              <span>PIN</span>
              <strong>{pin}</strong>
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/joincreate");
            }}
            className="text-sm text-red-900 font-semibold text-center absolute right-[10%]"
          >
            <img src={quitbutton} alt="" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 mb-3">
          <p
            className="text-xl color-sushe-dg"
            onClick={() => {
              navigate(`/${tableNumber}/myorder`);
            }}
          >
            Your Orders
          </p>
          <p className="font-bold text-xl color-sushe-dg">Table Orders</p>
        </div>
      </div>
      <div className="mt-28">
        {allOrdersData &&
          allOrdersData.map((data, index) => {
            return (
              <Fragment key={index}>
                <AllOrderRow data={data} chevronbutton={chevronbutton} />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default AllOrder;
