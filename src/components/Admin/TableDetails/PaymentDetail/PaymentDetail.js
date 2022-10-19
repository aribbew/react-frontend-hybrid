import React from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { usePayment, useOrder } from "../../../../hooks";
import "./PaymentDetail.scss";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
} from "@mui/material";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key === "CARD") return <FaCreditCard />;
    if (key === "CASH") return <FaMoneyBill />;
    return null;
  };

  const onCloseTable = async () => {
    const result = window.confirm("Cerrar mesa para nuevos clientes?");
    if (result) {
      await closePayment(payment.id);

      for await (const order of orders) {
        await closeOrder(order.id);
      }

      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div className="payment-detail">
      <TableContainer className="font">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mesa:</TableCell>
              <TableCell>{payment.table_data.number}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total:</TableCell>
              <TableCell>RD$ {payment.totalPayment}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Forma de pago:</TableCell>
              <TableCell>{getIconPayment(payment.paymentType)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="button-container2">
        <Button onClick={onCloseTable} className="button2">
          Marcar como pagado y cerar mesa
        </Button>
      </div>
    </div>
  );
}

/* 
function Actions(props) {
const {category, updateCategory, deleteCategory} = props;

return(
<TableCell>
    <Button onClick={() => updateCategory(category)}>
        <HiOutlinePencil/>
    </Button>
    <Button onClick={() => deleteCategory(category)}>
            <AiOutlineClose className="close"/>
            </Button>
</TableCell>
)
} */
