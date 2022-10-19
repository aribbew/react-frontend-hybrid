import React from "react";
import "./ModalConfirm.scss";
import { Modal, Box, Typography, Button } from "@mui/material";

export function ModalConfirm(props) {
  const { title, show, onClose, onCloseText, onConfirm, onConfirmText } = props;
  return (
    <div>
      <Modal className="modal-basic" open={show} onClose={onClose}>
        <Box className="modal">
          <div className="logo-container">
            <div className="logo"></div>
          </div>
          <div className="title-container">
            {title && (
              <Typography className="title" component={"span"}>
                {title}
              </Typography>
            )}
          </div>
          <div className="button-container">
            <Button onClick={onClose} className="button">
              {onCloseText || "Cancelar"}
            </Button>
            <Button onClick={onConfirm} className="button">
              {onConfirmText || "Aceptar"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
