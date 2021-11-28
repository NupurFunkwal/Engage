import { Button } from '@material-ui/core'
import React from 'react'
import logo from '../../assets/logo.png'
import { useLocalContext } from '../../context/context'
import './style.css'

const Login = () => {
    const {login, loggedInUser} = useLocalContext()

    //login info
    console.log(loggedInUser);
    return (
        <div className="login">
            <img className="login_logo" src={logo} alt="Photon" />

            <Button variant="contained" onClick={()=> login()}>
                Login Now!
            </Button>
        </div>
    )
}

export default Login
