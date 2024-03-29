import React, { useEffect } from "react";
import axios from "axios";
import sushetext from "../assets/sushe-text.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";
import { OrderRow } from "./OrderRow";
import AddModal from "./AddModal";
import quitbutton from "../assets/quittable.svg";
import { useQuery } from "../hooks/useQuery";

const MyOrder = ({ userName }) => {
  const [allOrdersData, setAllOrdersData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pin } = useQuery();
  const { tableNumber } = useParams();

  function openAddModal() {
    setIsAddModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/validate-table?tableNumber=${tableNumber}&pin=${pin}`
      )
      .then((response) => {
        if (response.data.validate == false) {
          navigate("/joinpin");
        }
      }).catch;
  }, []);

  function deleteOrder(orderId) {
    axios
      .post("http://localhost:3000/deleteorder", {
        orderId: orderId,
        pin: pin,
        tableNumber: tableNumber,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          getOrdersData();
        } else {
          console.log("hai sbagliato qualcosa fratmo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getOrdersData() {
    axios
      .get(
        `http://localhost:3000/get-orders?tableNumber=${tableNumber}&userName=${userName}`
      )
      .then((response) => {
        setAllOrdersData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const intervalId = setInterval(getOrdersData, 5000);
    getOrdersData();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          <p className="font-bold text-xl color-sushe-dg">Your Orders</p>
          <p
            onClick={() => {
              navigate(`/${tableNumber}/allorder?pin=${pin}`);
            }}
            className="text-xl color-sushe-dg"
          >
            Table Orders
          </p>
        </div>
      </div>
      <div className="mt-28">
        {allOrdersData &&
          allOrdersData.map((order) => {
            return (
              <OrderRow
                refreshOrders={getOrdersData}
                key={order.id}
                order={order}
                deleteOrder={deleteOrder}
              />
            );
          })}
      </div>

      {isAddModalOpen && (
        <AddModal
          closeModal={() => setIsAddModalOpen(false)}
          refreshOrders={getOrdersData}
          userName={userName}
          tableNumber={tableNumber}
        />
      )}

      <button
        onClick={openAddModal}
        className="z-49 fixed font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 bottom-4 right-4"
      >
        {" "}
        + New Dish
      </button>
    </>
  );
};

export default MyOrder;
