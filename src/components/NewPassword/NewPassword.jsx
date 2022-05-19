// import './Login.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, getUsers } from '../../redux/actions/userActions'


const formSchema = Yup.object().shape({
    email: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/), "El email no es válido"),
    });

const formOptions = { resolver: yupResolver(formSchema) };

const NewPassword = () => {
    const nav = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset} = useForm(formOptions);
    let dispatch = useDispatch();
    const [msg, setMsg] = useState("")
    const usuarios = useSelector(state => state.userReducer.usuarios)

    const onSubmit = async (data) => {
        const findUser = usuarios.find(e => e.email === data.email)
        reset();
        if(findUser){
            dispatch(forgotPassword({email: data.email}))
            setMsg("Te recomendamos que al usar la contraseña, la cambies para mayor seguridad!")
        }else {
            setMsg("El email ingresado no existe")
        }
    };

    useEffect(() => {
        dispatch(getUsers());
    },[])

    useEffect(() => {
        if(msg === "El email ingresado no existe"){
            const timer = setTimeout(() => {
                setMsg("");
            }, 5000)
            return () => clearTimeout(timer);
        }else if(msg === "Te recomendamos que al usar la contraseña, la cambies para mayor seguridad!"){
            const timer = setTimeout(() => {
                nav('/login');
                setMsg("");
            }, 5000)
            return () => clearTimeout(timer);
        } 
    }, [msg])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-login-container">
                    <div className="login-container">
                        <div className="title-login">
                            Ingresá tu mail 
                        </div>
                        <div className="form-group-login">
                            <div className="login-labelAndInput">
                                <input
                                    className="input-login"
                                    type="text"
                                    name="email"
                                    {...register('email')}
                                />
                                <p className={msg ? 'newsletter_agregado_landing' : 'producto_sinagregar'}>{msg}</p>
                                {<div className="form-register-errors">{errors.email?.message}</div>}
                            </div>
                        </div>
                        <div className="register-btn">
                            <input
                                className="input-Login"
                                type="submit"
                                value="Enviar nueva contraseña"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export { NewPassword };