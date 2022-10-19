import React, { useState } from "react";
import "./SelectTable.scss";
import { Button } from "@mui/material";
import { useTable } from "../../../hooks";
import { Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export function SelectTable() {
  //   const { history } = props;
  const navigate = useNavigate();
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No has introducido ninguna mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) navigate(`/client/${tableNum}`);
      else setError("El numero de la mesa no existe");
    }
  };
  return (
    <div className="select-table">
      <div className="select-content">
        <div className="logo_container">
          <div className="logo"></div>
        </div>
        <p>introduce tu numero de mesa</p>
        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 1, 5, 10"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <div className="button-container2">
            <Button type="submit" className="button">
              Entrar
            </Button>
          </div>
        </Form>
        <p className="content-error">{error}</p>
      </div>
    </div>
  );
}
