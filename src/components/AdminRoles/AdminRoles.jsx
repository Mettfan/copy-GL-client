import React, { useState, useEffect } from 'react'
import "./AdminRoles.css"
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateRol } from '../../redux/actions/userActions';
import Cookies from "universal-cookie";

function AdminRoles() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('');
    const users = useSelector(state => state.userReducer.usuarios)
    let cookie = new Cookies();
    const tokenUser = cookie.get('user')?.tokenSession

    console.log('users', users)

    useEffect(() => {
        dispatch(getUsers({token: tokenUser}));
    },[])

    const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(updateRol({email: email, permission: permission, token: tokenUser}));
        alert('El cambio se ha producido con éxito');
        console.log(email, permission, tokenUser)
    }

    return (
        <div className="admin-roles-container">
            <form className="form-admin-role" onSubmit={handleSubmit}>
                <div className='form-admin-roles-container'>
                    <div className='admin-role-inputAndSelect'>
                        <div className="title-login">Cambiar rol del usuario</div>
                        <div className='form-group-login'>
                            <div className='admin-roles-labelAndInput'>
                                <label className="input-label-login">Email del usuario: </label>
                                <input className="admin-roles-input" type="text" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='admin-roles-labelAndInput'>
                                <label className="input-label-login">Nuevo rol: </label>                           
                                <select className="admin-role-select" onChange={e => setPermission(e.target.value)}>
                                    <option value=''>--Seleccione--</option>
                                    <option value='admin'>Administrador</option>
                                    <option value='user'>Usuario</option>
                                    <option value='baneado'>Banear</option>
                                </select>
                            </div>
                            <div className="form-submit-login">                            
                                <button className='register-btn' type='submit'>Cambiar rol</button>
                            </div>
                        </div>
                    </div>
                     <div className="admin-roles-card" >
                        {
                            users?.map((e,i) => {
                                return (
                                    <div key={i} className="card-user-permission">
                                        <p className="admin-role-p1">Nombre: {e.name}</p>
                                        <p className="admin-role-p2">Email: {e.email}</p>
                                        <p className="admin-role-p3">Permiso: {e.permission}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AdminRoles


