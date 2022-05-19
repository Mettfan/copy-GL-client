import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Success(){
    let cookie = new Cookies()
    let [params, setParams] = useSearchParams()
    let payment_id = params.get('payment_id')
    let email = params.get('email')
    let status = params.get('status')
    let status_detail = params.get('status_detail')
    let shoppingList = cookie.get('shoppingList')
    // useEffect( ( ) => {
    //     if (!payment_id.includes('x')){
    //         mercadoPagoSuccess(shoppingList)
    //     }
    //  }, [])
        return (<>
            <div>
                <div>
                    Success Status
                </div>  
                <div>
                    {payment_id}
                </div>
                <div>
                    {email}
                </div>
                <div>
                    {status}
                </div>
                <div>
                    {status_detail}
                </div>
                {shoppingList}
            </div>
        
    </>)
}