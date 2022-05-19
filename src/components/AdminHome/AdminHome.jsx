import {React, useState} from 'react';
import './AdminHome.css';
import { AdminEdit } from '../AdminEdit/AdminEdit';
import AdminGetProducts from '../AdminGetProducts/AdminGetProducts';
import AdminGetProductsDisabled from '../AdminGetProductDisabled/AdminGetProductDisabled';
import { AdminCreate } from '../AdminCreate/AdminCreate';
import AdminDetail from '../AdminDetail/AdminDetail';
import AdminRoles from '../AdminRoles/AdminRoles';
import AdminOrders from '../AdminOrders/AdminOrders';
import AdminMetaOrder from '../AdminMetaOrder/AdminMetaOrder';
import Cookies from "universal-cookie";

function AdminHome() {
  const [drawerActive, setDraweActive] = useState(false)
  const [state, setState] = useState("")
  const [productSend, setProductSend] = useState(null)
  /* const [order, setOrder] = useState("") */
  const [producto, setProduct] = useState(null)
  const [user, setUser] = useState(null)
  // const [disabled, setDisabled] = useState(false)
  const activeDrawer = () => {
      setDraweActive(!drawerActive)
  }
  let cookie = new Cookies();
  const tokenUser = cookie.get('user').permission
  console.log('tokenUser', tokenUser)

  const receiveProduct = (product) => {
    setProductSend(product)
    setState("orders")
  }
 /*  const viewOrder = (order) =>{
    setOrder(order)
    setState("view")
  } */
  const metaOrder = (array, sendAddress, status, delivery, total) => {
    /* console.log(array, sendAddress); */
    setUser({sendAddress, status, delivery, total})
    setProduct(array)
    setState("meta")
  }
  const handleHome = () => {
    setState("")
    // setDisabled(false)
  }
  const backState = () => {
    setState("ordenes")
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

  return ( (tokenUser === "admin") 
        ? 
    <div className="HomeAdmin-container">
        {/* <Drawer drawerActive={drawerActive} /> */}
      <div className="admin-drawer">
        {/* <Link to= '/admin/create' className="link-home"><p>Crear producto</p></Link> */}
        <button className="link-home" onClick={() => handleView("crear")}><p>Crear producto</p></button>
        <button className="link-home" onClick={() => handleHome("")}><p>Productos</p></button>
        <button className="link-home" onClick={() => handleView("ordenes")}><p>Órdenes</p></button>
        <button className="link-home" onClick={() => handleView("usuarios")}><p>Usuarios</p></button>
        <button className="link-home" onClick={() => handleView("mi cuenta")}><p>Mi cuenta</p></button>
        <button className="link-home" onClick={() => handleView("desactivados")}><p>Desactivados</p></button>
      </div>
      <div className="admin-info">
        {
          state === "" ? <AdminGetProducts receiveProduct={receiveProduct} activeDrawer={activeDrawer} />
          : state === "orders" ? <AdminEdit product={productSend} handleHome={handleHome} activeDrawer={activeDrawer} /> 
          : state === "ordenes" ? <AdminOrders /* viewOrder={viewOrder} */ metaOrder={metaOrder}/>
          /* : state === "view" ? <AdminView id={order} back={backState}/> */
          : state === "meta" ? <AdminMetaOrder producto={producto} back={backState} sendAddress={user}/>
          : state === "crear" ? <AdminCreate handleHome={handleHome} />
          : state === "desactivados" ? <AdminGetProductsDisabled />
          : state === "mi cuenta" ? <AdminDetail />
          : state === "usuarios" ? <AdminRoles />
          : null
        }
      </div>
    </div>
    : "Usuario sin permiso para esta información"
  )
}

export default AdminHome