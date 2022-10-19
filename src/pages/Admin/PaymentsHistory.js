import React, { useEffect } from "react";
import { HeaderPage, TablePayments } from "../../components/Admin";
import ReactLoading from "react-loading";
import { usePayment } from "../../hooks";

export function PaymentsHistory() {
  const { loading, payments, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <HeaderPage title="Historial de pagos" />
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
        <TablePayments payments={payments} />
      )}
    </>
  );
}
