import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Products.scss";
import { useProduct } from "../../hooks";
import ReactLoading from "react-loading";
import { ListProducts } from "../../components/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const { loading, product, getProductByCategory } = useProduct();

  useEffect(() => {
    getProductByCategory(idCategory);
  }, [idCategory]);
  return (
    <div className="product-container-table">
      <Link to={`/client/${tableNumber}`} className="back-button">
        Volver a Categorias
      </Link>
      {loading ? (
        <div>
          <div className="loader-container">
            <ReactLoading
              className="loader"
              type="spin"
              color="black"
              height={64}
              width={64}
            />
          </div>
          <div className="title">
            <p>Cargando...</p>
          </div>
        </div>
      ) : (
        <ListProducts product={product} />
      )}
    </div>
  );
}
