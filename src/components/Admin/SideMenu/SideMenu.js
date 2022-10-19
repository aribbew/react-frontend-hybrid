import React from "react";
import "./_SideMenu.scss";
import { AiOutlineMenu, AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";

export function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();
  // const { history } = useNavigate();
  const navigate = useNavigate();
  return (
    <div className="container">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );

  function MenuLeft(props) {
    const { auth } = useAuth();
    return (
      <div className="SideMenu-container">
        <div className="sideBar">
          <AiOutlineMenu className="logo" />
          <h3 className="title">Langosta Admin</h3>
        </div>
        <div className="side-menu-list">
          <button
            className="side-container-list"
            onClick={() => navigate("/admin")}
          >
            <AiOutlineHome /> Pedidos
          </button>
          <button
            className="side-container-list"
            onClick={() => navigate("/admin/tables")}
          >
            <AiOutlineTable /> Mesas
          </button>
          <button
            className="side-container-list"
            onClick={() => navigate("/admin/payments-history")}
          >
            <AiOutlineHistory /> Historial pagos
          </button>
          <button
            className="side-container-list"
            onClick={() => navigate("/admin/categories")}
          >
            <BiCategory /> Categoria
          </button>
          <button
            className="side-container-list"
            onClick={() => navigate("/admin/products")}
          >
            <BsCartCheck /> Productos
          </button>
          {auth.me?.is_staff && (
            <button
              className="side-container-list"
              onClick={() => navigate("/admin/users")}
            >
              <HiOutlineUsers /> Usuarios
            </button>
          )}
        </div>
      </div>
    );
  }
}
