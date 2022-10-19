import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { Button } from "@mui/material";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import { useOrder, useTable } from "../../../hooks";
// import { useOrder } from "../../../hooks";
import "./ListProductCart.scss";

export function ListProductCart(props) {
  //   const { getOrdersCommentsByCart } = useOrder();
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);
  };

  //   useEffect(() => {
  //     getOrdersCommentsByCart();
  //   }, []);

  //   const {} =

  return (
    <div className="list-product-cart">
      <div>
        {map(products, (product, index) => (
          <div key={index} className="product-cart">
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <span>RD$ {product.price}</span>
            <Button className="btn-icon" onClick={() => removeProduct(index)}>
              <AiOutlineClose className="close" />
            </Button>
          </div>
        ))}
        {/* <div className="input-text-container">
          <input
            type="text"
            placeholder="Agrega una solicitud"
            className="input-text"
          />
        </div> */}
        <div className="button-container">
          <Button className="button" type="submit" onClick={createOrder}>
            Realizar Pedido (RD${total})
          </Button>
        </div>
      </div>
    </div>
  );
}
