import { useState } from "react";
import {
  getProductsApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductByCategoryApi,
} from "../api/products";
import { useAuth } from "./";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProducts] = useState(null);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProductById = async (id) => {
    try {
      const product = await getProductByIdApi(id);
      return product;
    } catch (error) {
      setError(error);
    }
  };

  const getProductByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductByCategoryApi(idCategory);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    product,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByCategory,
  };
}
