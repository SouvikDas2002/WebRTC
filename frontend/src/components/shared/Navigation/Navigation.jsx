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
    const {isAuth,user}=useSelector(state=>state.auth)
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
      {isAuth &&
      <div className={styles.navRight}>
        <h3 className={styles.name}>{user.name}</h3>
        <Link to='/'>
          <img className={styles.avatar} src={user.avatar} width="40" height="40" alt="pic"/>
        </Link>
        <button className={styles.logoutButton} onClick={logoutUser}>Logout -{`>`}</button>
      </div>}
    </nav>
  )
}

export default Navigation
