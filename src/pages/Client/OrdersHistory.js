import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrder, useTable, usePayment } from "../../hooks";
import { Button } from "@mui/material";
import { map, size, forEach } from "lodash";
import { ModalConfirm } from "../../components/Admin/Common";
import { OrdersHistoryItem } from "../../components/Client";
export function OrdersHistory() {
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idtable, setIdtable] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdtable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idtable) {
        const response = await getPaymentByTable(idtable);
        setIsRequestAccount(response);
      }
    })();
  }, [idtable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });
    const paymentData = {
      table: idtable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };
    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h2>Historial de pedidos</h2>

      {loading ? (
        <p>cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <div className="button-container">
              <Button
                className="button"
                onClick={() =>
                  size(isRequestAccount) === 0 && setShowTypePayment(true)
                }
              >
                {size(isRequestAccount) > 0
                  ? "La cuenta ya esta pedida"
                  : "Pedir la cuenta"}
              </Button>
            </div>
          )}

          {map(orders, (order) => (
            <OrdersHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}
      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("CARD")}
      />
    </div>
  );
}
