import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { createUser, userLogin } from '../../redux/actions/userActions';

// Mi ID de cliente temporal (Requiere seguridad)
const clientId = "141090610633-2n16fmmu0hek8ioah1m1o6508blcmn4t.apps.googleusercontent.com";

function ConnectGoogle(props) {

    //Hooks necesarios
    let nav = useNavigate()
    let cookie = new Cookies()
    let dispatch = useDispatch()

    // Declaramos estados
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
   
    //Lo que pasa cuando es autenticado correctamente por Google
    const onLoginSuccess = (res) => {

        //User
        let user = res.profileObj

        // clg
        console.log('Login Success:', user);

        // Seteamos las cookies necesarias 9+
        cookie.set('googleUser', user)

        // cookie.set('user', {
            
        //     user: {
        //         name: user.givenName,
        //         lastName: user.familyName,
        //         email: user.email,
        //         picture: user.imageUrl        
        //     }    
        // }
        // )
        
        
        
        setShowloginButton(false);
        setShowlogoutButton(true);
        
        dispatch(createUser({name: user?.givenName, email: user?.email, dni: user?.googleId, password: user?.imageUrl, sendAddress: null}))
        dispatch(userLogin({email: user?.email, password: user?.imageUrl}))
        cookie.get('user') && props.redirect && nav('/home')
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    // Lo que pasa cuando el usuario de desloguea
    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);

        cookie.remove('user')
        cookie.remove('googleUser')
        !cookie.get('user') && props.redirectLogout && nav('/home')
        localStorage.clear()
        window.location.reload()
        // setgoogleUser()
    };

    return (
        <div>
            {/* {googleUser?.givenName} */}
            { showloginButton && props.login ?

                // Componente que google nos ofrece
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Conectate con Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton && props.logout ?
// Componente que google nos ofrece
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Cerrar Sesión"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default ConnectGoogle;