import {React, useState} from 'react';
import './AdminHome.css';
import { AdminEdit } from '../AdminEdit/AdminEdit';
import AdminGetProducts from '../AdminGetProducts/AdminGetProducts';
import AdminGetProductsDisabled from '../AdminGetProductDisabled/AdminGetProductDisabled';
import { AdminCreate } from '../AdminCreate/AdminCreate';
import AdminDetail from '../AdminDetail/AdminDetail';
import AdminRoles from '../AdminRoles/AdminRoles';

function AdminHome() {
  const [drawerActive, setDraweActive] = useState(false)
  const [state, setState] = useState("")
  const [productSend, setProductSend] = useState(null)
  // const [disabled, setDisabled] = useState(false)
  const activeDrawer = () => {
      setDraweActive(!drawerActive)
  }

  const receiveProduct = (product) => {
    setProductSend(product)
    setState("orders")
  }
  const handleHome = () => {
    setState("")
    // setDisabled(false)
  }

  // const DrawerContents = () => (
  //     <div className="DrawerContents__Container"><AdminEdit product={productSend} activeDrawer={activeDrawer} /></div>
  // // );

  // const Drawer = ({ drawerActive }) => (
  //     <div className={`Drawer__Container ${drawerActive ? "Drawer__Container--isOpen" : ''}`}>
  //         <DrawerContents />
  //     </div>
  // );

  const handleView = (select) => {
    setState(select)
  }

  return (
    <div className="HomeAdmin-container">
        {/* <Drawer drawerActive={drawerActive} /> */}
      <div className="admin-drawer">
        {/* <Link to= '/admin/create' className="link-home"><p>Crear producto</p></Link> */}
        <button className="link-home" onClick={() => handleView("crear")}><p>Crear producto</p></button>
        <button className="link-home" onClick={() => handleHome("")}><p>Productos</p></button>
        <button className="link-home" onClick={() => handleView("")}><p>Órdenes</p></button>
        <button className="link-home" onClick={() => handleView("usuarios")}><p>Usuarios</p></button>
        <button className="link-home" onClick={() => handleView("mi cuenta")}><p>Mi cuenta</p></button>
        <button className="link-home" onClick={() => handleView("desactivados")}><p>Desactivados</p></button>
      </div>
      <div className="admin-info">
        {
          state === "" ? <AdminGetProducts receiveProduct={receiveProduct} activeDrawer={activeDrawer} />
          : state === "orders" ? <AdminEdit product={productSend} handleHome={handleHome} activeDrawer={activeDrawer} /> 
          : state === "crear" ? <AdminCreate handleHome={handleHome} />
          : state === "desactivados" ? <AdminGetProductsDisabled />
          : state === "mi cuenta" ? <AdminDetail />
          : state === "usuarios" ? <AdminRoles />
          : null
        }
      </div>
    </div>
  )
}

export default AdminHome