import React from 'react'
import { Link } from "react-router-dom"

function CardSucces({ image, name, size, price, discount, id, quantity }) {
    const subtotal = Number((((1-(discount/100))*price)*quantity).toFixed(0));

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
                <div className="quantity-stock">
                    <p className="btn-btn-p">{quantity}</p>  
                </div>
                </div>
                <div className="price-slim">
                    <div>
                    {
                        discount 
                        ?
                        <div className="price-discount-slim">
                        <p>{ discount }%</p>
                        <strike>${ (price * quantity).toFixed(0) }</strike>
                    </div>
                        : 
                        null
                    } 
                    </div>
                    <p className="price-slim-card">${ subtotal }</p>
                </div>
            </div>
        </div>
    )
}

export default CardSucces