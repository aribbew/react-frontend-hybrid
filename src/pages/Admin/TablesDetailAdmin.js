import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrder, useTable, usePayment } from "../../hooks";
import ReactLoading from "react-loading";
import { forEach, size } from "lodash";
import { ModalBasic } from "../../components/Admin";
import "./TablesDetailAdmin";
import {
  HeaderPage,
  ListOrderAdmin,
  AddOrderForm,
  PaymentDetail,
} from "../../components/Admin";
export function TablesDetailAdmin() {
  const [paymentData, setPaymentData] = useState(null);
  const [reloadOrders, setReloadOrders] = useState(false);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const [showModal, setShowModal] = useState(false);
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id, [id]);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm(
      "Estas seguro de generar la cuenta de la mesa?"
    );
    if (result) {
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "Pago con tarjeta pulsa Aceptar con efectivo pulsa Cancelar"
      );
      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "CARD" : "CASH",
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };
  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "A??adir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <div>
          <div className="loader-container">
            <ReactLoading
              className="loader"
              type="spin"
              color="black"
              height={64}
              width={64}
            />
          </div>
          <div className="title">
            <p>Cargando...</p>
          </div>
        </div>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={"Generear Pedidos"}
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}
