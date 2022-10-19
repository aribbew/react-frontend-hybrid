import React from "react";
import "./_AdminLayout.scss";
import { useAuth } from "../../hooks";
import { LoginAdmin } from "../../pages/Admin";
import { TopMenu, SideMenu } from "../../components/Admin";


export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth();

  if (!auth) return <LoginAdmin />;

  return (
    <div>
      <div className="navbar">
      <TopMenu/>
      </div>

      <div>
        <SideMenu>
          {children}
        </SideMenu>
      </div>
    </div>
  );
}
