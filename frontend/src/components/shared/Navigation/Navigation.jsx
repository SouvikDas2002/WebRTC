import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navigation.module.css"
import { logout } from '../../../http';
import {useDispatch,useSelector} from 'react-redux';
import {setAuth} from '../../../store/authSlice';

function Navigation() {
    const brandStyle={
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display:'flex',
        alignItems:'center',
    };
    const logoText={
        marginLeft:'10px'
    }
    const dispatch=useDispatch();
    const {isAuth}=useSelector(state=>state.auth)
    async function logoutUser(){
      try{
      const {data}=await logout();
      console.log(data);
      dispatch(setAuth(data));
      }catch(e){
        console.log(e);
      }
    }
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src='/images/logo.png' alt="Logo"/>
         <span style={logoText}>Dev-House</span>
      </Link>
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  )
}

export default Navigation
