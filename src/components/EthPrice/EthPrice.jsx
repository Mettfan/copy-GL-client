import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import './EthPrice.css'


export default function EthPrice (props) {
    useEffect( () => {
        getPrice()
    }, [])
    let cookie = new Cookies()
    let [state, setState] = useState({
        currency: props.currencyCode,
        price: ''
    })
    let actual_price = state.price
    let actual_currency = state.currency
    let apiUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=${actual_currency}`

    async function getPrice(){
        await axios.get(apiUrl).then( response => {
            let price = response.data.DISPLAY.ETH[actual_currency]?.PRICE
            setState({...state, price: price})
            cookie.set('ethInfo', {...cookie.get('ethInfo'), [actual_currency]: price})
        })
    }

    async function changeCurrency(e){
        setState({...state, currency: e.target.value})
    }

    return (
    <>
    
    <select onChange={ (e) => changeCurrency(e)}>
                        <option value={'USD'}>USD</option>
                        <option value={'ARS'}>ARS</option>
                        <option value={'MXN'}>MXN</option>
                    </select>
    <button onClick={( ) => getPrice()}> 
        <img className="reloadIcon" src="https://icons-for-free.com/download-icon-refresh+reload+update+icon-1320191166843452904_512.png"></img>
    </button>
    <div className="equivalencyEth">
        {actual_price && '1 ETH ≈ ' + actual_price}
    </div>
    
    
    </>
    )
}