import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";
import EthPrice from "../EthPrice/EthPrice";
import './MetaCheckout.css';
import EthLogo from '../../assets/EthLogo.png'
let metaCover = 'https://www.bitdegree.org/crypto/storage/media/images/metamask-wallet-review-logo-big.o.png'
let eth_test = 0.00001




function MetaCheckout() {
    let cookie = new Cookies()
    let ethInfo = cookie.get('ethInfo')
    let shoppingTotal = cookie.get('shoppingTotal') 
    let [state, setState] = useState({
        eth: eth_test,
        currencyCode: 'USD'
    })
    let eth = state.eth
    let currencyCode = state.currencyCode


    return (
      <>

        <div className="metaCheckoutBg">
            <div className="metaLogoCheckoutContainer">
                <img className="metaLogoCheckout" src={metaCover}></img>
            </div>
            <div className="ethereumLogoCheckoutContainer">
                <img className="ethereumLogoCheckout" src={EthLogo}></img>
            </div>

            {/* Si hay wallet muestra el botón de pago */}
            <div className="paymentContainer">
                { localStorage.getItem('wallet') ?
                    <div className="metaTransaction">
                        <EthPrice currencyCode = {currencyCode}></EthPrice>
                        <div className="metaPaymentButtonContainer">
                            <ConnectMetamask type = 'transaction' eth = {eth} showLastTx = {true}></ConnectMetamask>
                            <div className="feeDialog">*Metamask may charge a fee transaction</div>
                        </div>
                    </div>
                    :
                    // Si no hay wallet te muestra el botón de login
                    <div className="metaLoginCheckout">
                        <ConnectMetamask type = 'login' loginTextButton = 'Conectá tu Wallet' showLastTx = {false}></ConnectMetamask>
                    </div>
                }
            </div>
        </div>

        
      </>
    );
}

export default MetaCheckout;
