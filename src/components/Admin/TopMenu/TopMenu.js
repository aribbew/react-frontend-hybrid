import React from 'react'
import './_TopMenu.scss'
import { useAuth } from "../../../hooks";

export function TopMenu() {
    const {auth, logout} = useAuth();
    const renderName = () => {
        if(auth.me?.first_name && auth.me?.last_name){
            return `${auth.me.first_name} ${auth.me.last_name}`
        }
        return auth.me?.username;
    }
  return (
    <div className="navbar-container">
        <div className='fill'>
                <span></span>
        </div>
        <div className="separator">
        <div className="logo">

        </div>
        </div>
        

        <div className="user-logout-container">
        <div className="user-info">

            <p>Hola, {renderName()}</p>
        </div>
        <div className="logout-button">
            <button className='icon' onClick={logout}> </button>
        </div>
        </div>
    </div>
  )
}
