import React from 'react'
import './CardSlim.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { returnProduct, totalDeleteShopping, totalShopping, putProduct  } from "../../redux/actions/shoppingActions"
import Cookies from "universal-cookie";
import { Button, Modal } from 'react-bootstrap';

function CardSlim({ image, name, size, stock, price, index, discount, id, quantity, deleteProductShopping }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState((quantity || 1));
  const subtotal = Number((((1-(discount/100))*price)*count).toFixed(0));
  let cookie = new Cookies();
  const user = cookie.get('user')?.user
  const shoppingCookie = cookie.get('shopping')
  const totalShoppingCookie = cookie.get('totalShopping')
  
  useEffect(() => {
    dispatch(totalShopping([index, subtotal]))
    if(user) {
      dispatch(putProduct({ email: user?.email, productId: Number(id), productQuantity: count }))
    }
    if(!user){
      const itemQuantity = {...shoppingCookie[index]?.UserProduct, quantity: count}
      const productIndex = {...shoppingCookie[index], UserProduct: itemQuantity }
      const copyShopping = shoppingCookie
      copyShopping?.splice(index, 1, productIndex)

      cookie.set('shopping', 
        copyShopping
      , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia

      const totalCart = totalShoppingCookie
      console.log('totalShoppingCookie', totalShoppingCookie)
      console.log('totalCart', totalCart)
      deleteProductShopping()
    }
  },[dispatch, count]);

  const handleDelete = () => {
    dispatch(totalDeleteShopping(index))
    if(user){
      dispatch(returnProduct({ email: user?.email, productId: Number(id) }))
    }
    if(!user){
      const copyShopping = shoppingCookie
      copyShopping.splice(index, 1)
        cookie.set('shopping', 
        copyShopping
      , { path: '/', expires: new Date(Date.now() + (3600 * 1000 * 24))}); //1 dia
      deleteProductShopping()
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card-slim-container">
      <div className="card-slim-1">
        <div className="img-slim-card">
          <Link to={`/producto/${id}`} style={{ color: 'white' }}>
            <img className="img-slim" src={ image } alt="imagen rota"></img>
          </Link>
        </div>
        <div className="card-slim-information">
          <div className="name-size">
            <Link to={`/producto/${id}`} style={{ color: '#0E1428', textDecoration: 'none'  }}>
              <p>{ name }</p>
            </Link>
            <p>Talle: { size }</p>
          </div>
          {
            stock
            ?
          <div className="quantity-stock">
            <div className="Button-quantity">
              <button className="btn-btn" onClick={() => count >= 2 ? setCount(count -1) : null}>-</button>
              <p className="btn-btn-p">{count}</p>  
              <button className="btn-btn" onClick={() => count < stock ? setCount(count +1) : null}>+</button>  
            </div>
            <p className="stock-available">{ stock } disponibles</p>
          </div>
            : 
            null
          } 
        </div>
          <div className="price-slim">
            <div>
              {
                discount 
                ?
                <div className="price-discount-slim">
                <p>{ discount }%</p>
                <strike>${ (price * count).toFixed(0) }</strike>
              </div>
                : 
                null
              } 
            </div>
            <p className="price-slim-card">${ subtotal }</p>
          </div>
      </div>
      <div className="card-slim-2">
        
      <Button variant="primary" onClick={handleShow} className="btn-delete-cart">
        {!stock ? "Eliminar de Favoritos" : "Eliminar del carrito"}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          seguro que queres borrar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleDelete()} >Si</Button>
        </Modal.Footer>
      </Modal>
          
      
      </div>
    </div>
  )
}

export default CardSlim