import React, { Fragment } from "react";
import { useState } from "react";
import EditModal from "./EditModal";
import editbutton from "../assets/edit.svg";
import deletebutton from "../assets/delete.svg";

export const OrderRow = ({ order, deleteOrder, setRefresh }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      {isEditModalOpen && (
        <EditModal
          closeModal={() => setIsEditModalOpen(false)}
          order={order}
          setRefresh={setRefresh}
        />
      )}

      <div className="flex flex-row justify-between p-3">
        <ul className="flex flex-row gap-3">
          <li className="font-semibold text-xl rounded-xl bg-slate-200 p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
            {order.dish}
          </li>
          <li className="font-semibold text-xl rounded-xl bg-slate-200 p-2 bottom-4 right-4 h-10 min-w-10 w-auto text-center">
            {order.quantity}
          </li>
        </ul>
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={() => {
              setIsEditModalOpen(true);
            }}
            className="flex justify-center items-center font-bold text-md color-sushe-dg bg-sushe-lg rounded-xl min-w-10 min-h-10 w-auto p-2 bottom-4 right-4"
          >
            <img src={editbutton} alt="" />
          </button>
          <button
            onClick={() => {
              deleteOrder(order.id);
            }}
            className="flex justify-center items-center font-bold text-md color-sushe-dg bg-sushe-lg rounded-xl p-2 min-w-10 min-h-10 w-auto bottom-4 right-4"
          >
            <img src={deletebutton} alt="" />
          </button>
        </div>
      </div>
      <hr></hr>
    </Fragment>
  );
};
