import './Login.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
    const nav = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);

    const onSubmit = async (data) => {
        nav('/home');
    };

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
                        </div>
                        <div className="recover-pwd">
                            <button className="button-password-recovery" onClick={handleRecovery}>
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <div className="register-btn">
                            <input
                                className="input-Login"
                                type="submit"
                                value="Ingresar"
                            />
                        </div>
                        <button className='register-btn' onClick={handleRegister}>
                            Registrarse
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export { Login };