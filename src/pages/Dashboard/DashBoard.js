import React from 'react'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import style from "./Dashboard.module.css";
export default function DashBoard() {
    const { logout, currentUser } = useAuth()

    function signOut() {
        try {
            logout()
        } catch{
            console.log("error")
        }
    }

    return (
        <div className={style.dashboardBg}>
            <p>DashBoard</p> 
            <p>{currentUser?.email}</p>
            <Button name="Sign Out" type="button" clickFunction={signOut} />
        </div>
    )
}
