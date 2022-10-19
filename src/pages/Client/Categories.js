import React, { useEffect } from "react";
import "./Categories.scss";
import { useCategory } from "../../hooks";
import ReactLoading from "react-loading";
import { ListCategories } from "../../components/Client";

export function Categories() {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
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
        <ListCategories categories={categories} />
      )}
    </div>
  );
}
