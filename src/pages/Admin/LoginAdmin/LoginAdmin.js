import React from "react";
import './LoginAdmin.scss';
import { LoginForm } from "../../../components/Admin";

export function LoginAdmin() {
  return (
    <div className='Login-container'>
      <div className="logo_container">

      <div className="logo">
        
      </div>
      </div>
    <div className="login-admin">
      <div className="login-admin_content">
        <h2>Log in</h2>  
        
        <LoginForm/>
      </div>      
    </div>
    </div>
  );
}
