import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Button } from "@mui/material";
import { addProductCart } from "../../../api/cart";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { BsCartPlus } from "react-icons/bs";

import "./ListProducts.scss";

export function ListProducts(props) {
  const { product } = props;

  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido al carrito`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    injectStyle();
  };
  return (
    <div>
      <div className="list-products-client">
        {map(product, (products) => (
          <div key={products.id} className="products">
            <Button
              className="products-container"
              onClick={() => addCart(products)}
            >
              <Image src={products.image} size="medium" />
              <span>{products.title}</span>
              <div>
                <span>RD${products.price}</span>
              </div>
              <BsCartPlus />
            </Button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
