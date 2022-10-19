import React, { useEffect, useState } from "react";
import { useProduct } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getProductsCart } from "../../api/cart";
import { size } from "lodash";
import { ListProductCart } from "../../components/Client";

export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();
  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h2>Carrito</h2>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div className="cart-no-products">
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders/`}>
            <Button>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
