import React, { useEffect } from 'react'
import CardSucces from '../CardSucces/CardSucces'
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux"
import './Succes.css'
import { addMetaOrder } from '../../redux/actions/metamaskActions';
import Cookies from 'universal-cookie';
import { emptyShopping } from '../../redux/actions/shoppingActions'
import { useNavigate } from "react-router-dom"

function Succes() {
    const dispatch = useDispatch()
    let [params, setParams] = useSearchParams()
    let payment_id = params.get('payment_id')
    let status = params.get('status')
    const cookies = new Cookies();
    const user = cookies.get('user')?.user
    const productList = cookies.get('sendShopping')
    const totalShopping = cookies.get('totalShopping')
    const sendAddress = cookies.get('sendAddress')
    let nav = useNavigate() 


    useEffect(() => {
        cookies.remove('shopping')
        dispatch(emptyShopping({ email: user?.email}));
        dispatch(addMetaOrder({ payment_id: payment_id, email: user?.email, status: status, productList: productList, total: Number(totalShopping), sendAddress: sendAddress }));
    },[])

    return (
        <div className="succes-container" >
            <div className="succes-container-inside" >
            <h1>Datos de tu orden</h1>
            <div className="container-1">
                <p>Email: {user?.email}</p>
                <p>Total: ${totalShopping}</p>
                <p>Estado de pedido: {status}</p>
            </div>
            <div className="title-list-succes">
                <h3 style={{"margin-top": "20px"}}>Lista de productos:</h3>
            </div>
            <div className="container-2">
                <div>
                    {
                        productList?.map((product,i) => {
                            return <CardSucces 
                                key= { i }
                                id= { product?.id }
                                index= { i }
                                image= { product?.image }
                                name= { product?.name }
                                size= { product?.UserProduct.size }
                                quantity= {product?.UserProduct.quantity}
                                discount= { product?.discount }
                                price= { product?.price }
                            />
                        })
                    }
                </div>
            </div>
            <h4 style={{"margin-top": "20px"}}>Gracias por confiar en nosotros!</h4>
            <div className="shopping-cart-empty">
                <button className='register-btn' onClick={() => nav('/miscompras')}>
                    Mis compras
                </button>                
            </div>
        </div>
    </div>
    )
}

export default Succes