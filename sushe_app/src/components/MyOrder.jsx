import React, { useEffect } from "react";
import axios from "axios";
import sushetext from "../assets/sushe-text.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";
import { OrderRow } from "./OrderRow";
import AddModal from "./AddModal";

const MyOrder = ({ userName }) => {
  const [allOrdersData, setAllOrdersData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const { tableNumber } = useParams();

  function openAddModal() {
    setIsAddModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function deleteOrder(orderId) {
    axios
      .post("http://localhost:3000/deleteorder", {
        orderId: orderId,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          setRefresh(true);
        } else {
          console.log("hai sbagliato qualcosa fratmo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    function getOrdersData() {
      if (refresh) {
        axios
          .get(
            `http://localhost:3000/get-orders?tableNumber=${tableNumber}&userName=${userName}`
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
          <p className="font-bold text-xl color-sushe-dg">Your Orders</p>
          <p
            onClick={() => {
              navigate(`/${tableNumber}/allorder`);
            }}
            className="text-xl color-sushe-dg"
          >
            Table Orders
          </p>
        </div>
      </div>
      <div className="mt-24">
        {allOrdersData &&
          allOrdersData.map((order) => {
            return (
              <OrderRow
                setRefresh={setRefresh}
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
          setRefresh={setRefresh}
          userName={userName}
          tableNumber={tableNumber}
        />
      )}

      <button
        onClick={openAddModal}
        className=" z-49 fixed font-bold text-md color-sushe-dg bg-sushe-lg rounded-2xl p-2 bottom-4 right-4"
      >
        {" "}
        + New Dish
      </button>
    </>
  );
};

export default MyOrder;
