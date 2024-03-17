import React, { Fragment } from "react";
import { useState } from "react";
import EditModal from "./EditModal";

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

      <ul>
        <li>{order.dish}</li>
        <li>{order.quantity}</li>
        <li>{order.id}</li>
        <li>{order.table_id}</li>
        <li>{order.username}</li>
      </ul>
      <div className="flex flex-row gap-4 items-center">
        <button
          onClick={() => {
            setIsEditModalOpen(true);
          }}
          className="border"
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteOrder(order.id);
          }}
          className="border"
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
};
