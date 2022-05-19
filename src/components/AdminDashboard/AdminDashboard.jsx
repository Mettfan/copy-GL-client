import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getMetaOrders } from "../../redux/actions/metamaskActions";

function AdminDashboard() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.metamaskReducer.status) 

    useEffect(() => {
        dispatch(getMetaOrders());
    },[])

    console.log('orders', orders)

    return (
        <div>AdminDashboard
            <div>
                <div>Facturacion</div>
                <div>Total de ordenes</div>
                <div>Usuarios registrados</div>
            </div>
            {/* <div>
                {
                    orders?.map((e,i) => {
                        <div key={i}>
                            <div>{e.payment_id}</div>
                            <div>{e.email}</div>
                            <div>{e.status}</div>
                            <div>{e.total}</div>
                        </div>
                        return (
                            <div key={i}>
                                {
                                    e.productList.map((e,i) => {
                                        return(
                                            <div>
                                                <p>{e.name}</p> 
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div> */}
        </div>
    )
}

export default AdminDashboard