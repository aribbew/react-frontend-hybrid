import React, { useState } from "react";
import "./TablePayments.scss";
import { FaCreditCard, FaMoneyBill, FaEye } from "react-icons/fa";
import { map } from "lodash";
import moment from "moment";
import { ModalBasic } from "../../Common";
import { PaymentProductList } from "../../../Admin";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
} from "@mui/material";

export function TablePayments(props) {
  const { payments } = props;
  const getIconPaymentName = (key) => {
    if (key === "CARD") return <FaCreditCard />;
    if (key === "CASH") return <FaMoneyBill />;
    return null;
  };

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const showDetails = (payment) => {
    setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`);
    setContentModal(<PaymentProductList payment={payment} />);
    openCloseModal();
  };
  return (
    <>
      <TableContainer className="font">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={200}>ID</TableCell>
              <TableCell width={200}>Mesa</TableCell>
              <TableCell width={200}>Total</TableCell>
              <TableCell width={200}>Tipo de pago</TableCell>
              <TableCell width={200}>Fecha</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(payments, (payment, index) => (
              <TableRow key={index}>
                <TableCell width={200}>{payment.id}</TableCell>
                <TableCell width={200}>{payment.table_data.number}</TableCell>
                <TableCell width={200}>{payment.totalPayment}</TableCell>
                <TableCell width={200}>
                  {getIconPaymentName(payment.paymentType)}
                </TableCell>
                <TableCell width={200}>
                  {moment(payment.created_at).format("DD/MM/YYYY - HH:MM")}
                </TableCell>
                <TableCell width={200}>
                  <Button onClick={() => showDetails(payment)}>
                    <FaEye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
