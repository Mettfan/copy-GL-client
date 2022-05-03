import React from 'react'
import './AdminCardProduct.css';
import { BsPencilSquare } from 'react-icons/bs';
import { VscTrash } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';
import { VscEyeClosed } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { deleteProduct, editProduct } from '../../redux/actions/productActions';

function AdminCardProduct ( { image, name, stock_by_size, color, price, disabled, drawer, id, producto , receiveProduct },  ) {
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    drawer();
    receiveProduct(producto)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
    console.log('delete', id)
  }

  const handleDisabled = (e) => {
    e.preventDefault();
    dispatch(editProduct({id, "disabled": !disabled}));
  }

  return (
      <div className="card-admin-container">
        <div className="card-admin-1">
          <div className="img-admin-card">
            <img className="admin-panel-product-img" src={ image } alt="imagen rota"></img>
          </div>
          <div className="card-admin-information-slim">
              <p className="card-admin-name">{ name }</p>
              {/* <p className="card-admin-size">Talle: { size }</p> */}
              <p className="card-admin-color">Color: { color }</p>
              {/* <p className="card-admin-available">{ stock } disponibles</p> */}
              <p className="price-slim-card">${ price }</p>
          </div>
          <div className="buttons-admin-container">
            <button className="button-card-admin" onClick={(e) => {handleEdit(e)}}>
              <BsPencilSquare size={25}/>
            </button>
            <button className="button-card-admin" onClick={(e) => {handleDelete(e)}}>
              <VscTrash size={25} />
            </button >
            <button className="button-card-admin" onClick={(e) => {handleDisabled(e)}}>
              {
                disabled ? <VscEyeClosed size={25}/> :  <VscEye size={25}/>
              }
            </button>
          </div>
        </div>
      </div>
  )
}

export default AdminCardProduct