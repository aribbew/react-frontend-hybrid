import React from "react";
import classNames from "classnames/bind";
import moment from "moment";
import { Image } from "semantic-ui-react";
import "./OrdersHistoryItem.scss";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constant";

export function OrdersHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("order-history", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="history-time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>
      <div className="product-history">
        <Image src={image} />
        <span>{title}</span>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
}
