import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Button,
} from "@mui/material";
import { map } from "lodash";
import { HiOutlinePencil } from "react-icons/hi";
import QRCode from "qrcode.react";
import { ModalBasic } from "../../Common";
import { AiOutlineClose, AiOutlineQrcode } from "react-icons/ai";
export function TablestablesAdmin(props) {
  const { tables, updateTable, deleteTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showQr = (tables) => {
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <QRCode value={`${window.location.origin}/client/${tables.number}`} />
      </div>
    );
    openCloseModal();
  };

  return (
    <>
      <TableContainer className="font">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mesa Numero</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(tables, (tables, index) => (
              <TableRow key={index}>
                <TableCell>{tables.number} </TableCell>
                <Actions
                  tables={tables}
                  updateTable={updateTable}
                  deleteTable={deleteTable}
                  showQr={showQr}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Codigo QR"
        children={contentModal}
      />
    </>
  );
}

function Actions(props) {
  const { tables, updateTable, deleteTable, showQr } = props;

  return (
    <TableCell>
      <Button onClick={() => showQr(tables)}>
        <AiOutlineQrcode />
      </Button>
      <Button onClick={() => updateTable(tables)}>
        <HiOutlinePencil />
      </Button>
      <Button onClick={() => deleteTable(tables)}>
        <AiOutlineClose className="close" />
      </Button>
    </TableCell>
  );
}
