import React from "react";
import "./LoginForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../hooks";

export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: intialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        console.log("ERROR");
        console.log(error);
      }
    },
  });

  return (
    <div className="form_container">
      <form onSubmit={formik.handleSubmit} className="form">
        <input
          name="email"
          placeholder="Correo Electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <button type="submit" className="enviar">
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
}

function intialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
