import React, { useEffect } from "react";
import { useTable } from "../../hooks";
import "./_ClientLayout.scss";
import { Container } from "semantic-ui-react";
import { Button } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsCart4, BsList } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

export function ClientLayout(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    navigate("/");
  };

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`);
  };

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`);
  };

  return (
    <Container className="client-layout">
      <div className="logo-container">
        <Link to={`/client/${tableNumber}`}>
          <div className="logo"></div>
        </Link>
        <span>Mesa {tableNumber}</span>
        <div className="bt-container">
          <Button onClick={goToCart}>
            <BsCart4 />
          </Button>
          <Button onClick={goToOrders}>
            <BsList />
          </Button>
          <Button onClick={closeTable}>
            <AiOutlineLogout />
          </Button>
        </div>
      </div>
      <div className="layout-content">{children}</div>
    </Container>
  );
}
