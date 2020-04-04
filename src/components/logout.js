import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/style.css";
import "../styles/toast.css";
toast.configure();

//logout on clear local storage
const Logout = ()=>{
    localStorage.clear();
    toast.success("Logout Successfull !", {
        position: toast.POSITION.TOP_RIGHT
      });
    return <Redirect to = "/login" />
}

export default Logout;
