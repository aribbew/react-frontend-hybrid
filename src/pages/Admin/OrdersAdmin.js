import React, { useEffect, useState} from "react";
import { HeaderPage, TablesListAdmin } from "../../components/Admin";
import { useTable } from "../../hooks";
import ReactLoading from "react-loading";
import './OrdersAdmin.scss'


export function OrdersAdmin() {
  const {loading, tables, getTables} = useTable();
  useEffect(() => { getTables() }, [])
  
  return (
    <>
      <HeaderPage title='Restaurante' />
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
      <TablesListAdmin tables={tables}/>
    )}
    </>
  );
}
