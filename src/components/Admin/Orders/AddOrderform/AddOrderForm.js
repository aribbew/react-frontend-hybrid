import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { useProduct, useOrder } from "../../../../hooks";
import "./AddOrderForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Combobox from "react-widgets/Combobox";

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onReloadOrders } = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { product, getProducts, getProductById } = useProduct();
  const { addOrderToTable } = useOrder();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(product));
  }, [product]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.product) {
        await addOrderToTable(idTable, idProduct);
      }
      onReloadOrders();
      openCloseModal();
    },
  });

  useEffect(() => {
    addProductList();
  }, [formik.values]);

  const addProductList = async () => {
    try {
      const productId = formik.values.product;
      const arrayTemp = [];
      for await (const idProduct of productId) {
        const response = await getProductById(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductList = (index) => {
    const idProduct = [...formik.values.product];
    idProduct.splice(index, 1);
    formik.setFieldValue("product", idProduct);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="dropdown">
        <Combobox
          placeholder="Selecciona una categoria"
          data={productsFormat}
          dataKey="key"
          textField="text"
          value={null}
          onChange={(data, _) =>
            formik.setFieldValue("product", [
              ...formik.values.product,
              data.value,
            ])
          }
        />
      </div>
      <div className="add-order-form-list">
        {map(productsData, (products, index) => (
          <div className="add-order-form-product" key={index}>
            <div className="product-container">
              <Image src={products.image} avatar size="tiny" />
              <span>{products.title}</span>
            </div>
            <div className="button-container-delete">
              <Button
                type="button"
                className="button-delete"
                onClick={() => removeProductList(index)}
              >
                Borrar
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <Button type="submit" className="button">
          Añadir productos a la mesa
        </Button>
      </div>
    </form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  return {
    product: [],
  };
}

function validationSchema() {
  return {
    product: Yup.array().required(true),
  };
}
