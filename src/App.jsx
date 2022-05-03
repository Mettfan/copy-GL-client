import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminCreate } from './components/AdminCreate/AdminCreate';
import { AdminEdit } from './components/AdminEdit/AdminEdit';
import AdminHome from './components/AdminHome/AdminHome';
import { DetailProduct } from './components/DetailProduct/DetailProduct';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Nav/NavigationBar';



function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:id" element={<DetailProduct />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/create" element={<AdminCreate />} />

      </Routes>
    </div>
  );
}

export default App;
