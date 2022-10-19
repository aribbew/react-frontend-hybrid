import React from "react";
import "./OrderItemAdmin.scss";
import { Image } from "semantic-ui-react";
import classNames from "classnames/bind";
import { ORDER_STATUS } from "../../../../utils/constant";
import { useOrder } from "../../../../hooks";
import moment from "moment";
import "moment/locale/es";
import { Button, FormControlLabel } from "@mui/material";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;
  const { checkDeliveredOrder } = useOrder();

  const OncheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };
  return (
    <div
      className={classNames("order-item-container", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin-time">
        <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </div>
      <div className="order-item-product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      <div className="order-item-comment">
        <p>{order.comment}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING && (
        <Button onClick={OncheckDeliveredOrder} className="boton">
          Marcar Entregado
        </Button>
      )}
    </div>
  );
}
