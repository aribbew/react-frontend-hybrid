import React from "react";
import "./ListOrderAdmin.scss";
import { map } from "lodash";
import { OrderItemAdmin } from "../";

export function ListOrderAdmin(props) {
  const { orders, onReloadOrders } = props;
  return (
    <div className="list-order-container">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
}
