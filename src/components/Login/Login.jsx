import './Login.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/userActions';
import  ConnectGoogle  from '../ConnectGoogle/ConnectGoogle'
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { addfavProduct} from '../../redux/actions/favoritesActions';
import { addProduct, stateNav } from '../../redux/actions/shoppingActions';


const formSchema = Yup.object().shape({
    email: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/), "El email no es válido"),
    password: Yup.string()
        .required("Este campo es requerido")
    });

const formOptions = { resolver: yupResolver(formSchema) };

const Login = () => {
    let cookie = new Cookies();
    const shoppingCookie = cookie.get('shopping')
    const favoriteCookie = cookie.get('favorite')
    const user = cookie.get('user')?.user
    const nav = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);
    const status = useSelector( (state) => state.userReducer.status)
    let dispatch = useDispatch();
    const [msg, setMsg] = useState("")

    const onSubmit = async (data) => {
        dispatch(userLogin(data));
    };

    useEffect(() => {
        if(status?.msg === "usuario logueado con éxito") {
            dispatch(stateNav())
            shoppingCookie?.map(a => dispatch(addProduct({ email: user?.email, productId: Number(a.id), productSize: a.UserProduct.size, productQuantity: a.UserProduct.quantity === undefined ? 1 : a.UserProduct.quantity })))
            favoriteCookie?.map(a => dispatch(addfavProduct({ email: user?.email, productId: Number(a.id) })))
            cookie.remove('shopping')
            cookie.remove('favorite')
            nav('/home');
            } else if(status === "contraseña incorrecta") {
            setMsg(status)
            } else if( status=== "Usuario o contraseña incorrecta") {
            setMsg(status)
        }
    },[status])

    useEffect(() => {
        const timer = setTimeout(() => {
        setMsg("");
        }, 5000)
        return () => clearTimeout(timer);
    }, [msg])

    const handleRecovery = () => {
        nav('/user/newpassword');
    }

    const handleRegister = () => {
        nav('/register');
    }
    

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-login-container">
                    <div className="login-container">
                        <div className="title-login">
                            Inicia sesión aquí
                        </div>
                        <div className="form-group-login">
                            <div className="login-labelAndInput">
                                <label className="input-label-login">Email: </label>
                                <input
                                    className="input-login"
                                    type="text"
                                    name="email"
                                    {...register('email')}
                                />
                                {<div className="form-register-errors">{errors.email?.message}</div>}
                            </div>
                            <div className="login-labelAndInput">
                                <label className="input-label-login">Contraseña: </label>
                                <input
                                    autoComplete="on"
                                    className="input-login"
                                    type="password"
                                    name="password"
                                    {...register('password')}
                                />
                                {<div className="form-register-errors">{errors.password?.message}</div>}
                            </div>
                            <p className={msg ? 'newsletter_agregado_landing' : 'producto_sinagregar'}>{msg}</p>
                        </div>
                        <button className="register-btn">
                            <input
                                className="input-Login"
                                type="submit"
                                value="Ingresar"
                            />
                        </button>
                        <button className='register-btn' onClick={handleRegister}>
                            Registrarse
                        </button>
                         <div className="recover-pwd">
                            <button className="button-password-recovery" onClick={handleRecovery}>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <div className='googleButtonContainer'>
                            <ConnectGoogle login = {true} redirect = {true}></ConnectGoogle>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export { Login };