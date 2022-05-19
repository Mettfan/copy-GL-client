import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminCreate } from './components/AdminCreate/AdminCreate';
import AdminHome from './components/AdminHome/AdminHome';
import { DetailProduct } from './components/DetailProduct/DetailProduct';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import UserDetail from './components/UserDetail/UserDetail';
import EditUser from './components/EditUser/EditUser';
import AdminDetail from './components/AdminDetail/AdminDetail';
import AdminRegisterEdit from './components/AdminRegisterEdit/AdminRegisterEdit';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Terminos from './components/Terminos/Terminos';
import EditSend from './components/EditSend/EditSend';
import EditPassword from './components/EditPassword/EditPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Nav/NavigationBar';
import ConnectMetamask from './components/ConnectMetamask/ConnectMetamask';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Favorites from './components/Favorites/Favorites';
import MapTienda from './components/MapTienda/MapTienda';
import Cookies from 'universal-cookie';
import { userLogin } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
import MetaCheckout from './components/MetaCheckout/MetaCheckout';
import ChatBot from './components/Chatbot/Chatbot';
import { NewPassword } from './components/NewPassword/NewPassword';
import Succes from './components/Succes/Succes';
import Success from './components/Success/Success'; //cual es?
import Helpcenter from './components/Chat/Helpcenter';
import Collapse from 'react-bootstrap/Collapse'
import {BiChat} from 'react-icons/bi';
import MisCompras from './components/MisCompras/MisCompras';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {

  const cookies = new Cookies();
  console.log(cookies.get('user'));

  
 const user = cookies.get('user');
  console.log(cookies.get('user'));
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <NavigationBar />
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />}/>

        <Route path="/miscompras" element={<MisCompras />} />
        <Route path="/:email/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/newpassword" element={<NewPassword />} />
        <Route path="/producto/:id" element={<DetailProduct />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user/products/send" element={<EditSend></EditSend>} />
        <Route path="/user/profile" element={<UserDetail></UserDetail>} />
        <Route path="/user/editpassword" element={<EditPassword></EditPassword>} />
        <Route path="/editar" element={<EditUser></EditUser>} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/profile" element={<AdminDetail></AdminDetail>} />
        <Route path="/admin/editar" element={<AdminRegisterEdit></AdminRegisterEdit>} />
        <Route path='/mapa' element={<MapTienda></MapTienda>} />
        <Route path='/terminos' element={<Terminos></Terminos>} />
        <Route path='/success' element={<Succes />} />
        <Route path='/admindash' element={<AdminDashboard />} />
        
        <Route path="/meta/checkout" element={<MetaCheckout />} />

        <Route path="/chatbot" element={<ChatBot />} />
        {/* <Route path="/success" element={<Success />} /> */}


      </Routes>
      {user === undefined ? null :
      <button
      onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
      >
        <BiChat/>
        Soporte
      </button>
      }
      <Collapse in={open}>
        <div id="example-collapse-text">
      {user === undefined ? null : <Helpcenter/>}
      </div>
      </Collapse>
      <Footer />

    </div>
  );
}

export default App;
