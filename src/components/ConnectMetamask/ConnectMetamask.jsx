import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { addMetaOrder } from '../../redux/actions/metamaskActions';
import './ConnectMetamask.css';
// props = { type, eth, loginTextButton }
function ConnectMetamask(props) {
    let dispatch = useDispatch()
    let nav = useNavigate()
    let metaLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'
    let metaMaskXtensionURL = 'https://metamask.io/download/'
    let cookie = new Cookies()
    // Estado donde guardamos los datos de metamask del usuario 
    let [state, setState] = useState({
        walletAddress: localStorage.getItem('wallet'),
        userBalance: localStorage.getItem('balance'),
        tx: null,
        error: null,
        eth: props.eth || 0.005,
        ishoverWidget_menu: false,
        isRequesting: false
    })

    // Creamos los punteros al estado para facilitar lectura
    let walletAddress = state.walletAddress
    let userBalance = state.userBalance
    let tx = state.tx
    let error = state.error
    let eth = state.eth
    let ishoverWidget_menu = state.ishoverWidget_menu
    let isRequesting = state.isRequesting
    // Funcion que abre Pop Up y obtiene los datos de la extensión de Metamask
    async function requestAccount(){

        // Se revisa si existe la extension
        if (!isRequesting){

            if(window.ethereum){

                
                try{
                    setState({...state, isRequesting: true})
                    // Se realiza una petición con la extensión
                    await window.ethereum.request({
                        // Abre el Pop Up de login 
                        method: 'eth_requestAccounts'
    
                        // Obtiene las cuentas 
                    }).then( async accounts => {
                        
                        // Se guarda en el localStorage la dirección de la primera wallet encontrada
                        localStorage.setItem( 'wallet', accounts[0] )
                        
                        // Posteriormente se realiza una petición nueva para obtener el balance de cuenta
                        await window.ethereum.request({
                            // No abre popUp y se le pasa la cuenta encontrada pidiendo el último estado de transacción ('latest')
                            method: 'eth_getBalance',
                            params: [accounts[0], 'latest']
    
                            // Obtiene balance en formato Ether
                        }).then( balance => {
                            
                            // Se guarda en el localStorage el balance, dandole formato para que aparezca como cantidad
                            localStorage.setItem( 'balance', String(ethers.utils.formatEther(balance)))
    
                            setState({...state, isRequesting: false})
                            // Se actualiza la página para ver los cambios
                            // window.location.reload()

                            nav('/home')
                        })
                    } )
                    
                    
                }
                catch (error) {
                    setState({...state, error: error.message})
                }
            }
            else{
                setState({...state, error: <a href={metaMaskXtensionURL} target = '_blank'>Install Metamask</a>})
            }
            
        } 
    }
    
    // Se crea una transaccion a partir de los datos de Metamask
    async function transaction(eth){
        console.log('cookie.get meta', cookie.get('productList'))
        try{
            !walletAddress && requestAccount()
            if (window.ethereum){
                // requestAccount()
    
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const tx = await signer.sendTransaction({
                    to: '0x4f966a88c0b741bb93287547df012c8101878832',
                    value: ethers.utils.parseEther(String(eth))
                })
                setState({...state, tx: tx})
                localStorage.setItem('lastTx', tx.hash)
            //     dispatch(addMetaOrder({
                
            //     payment_id: tx.hash, 
            //     email: cookie.get('user').user.email,
            //     productList: cookie.get('productList') || [{title: 'test product'}, {title: 'test product 2'}],
            //     status: 'pending',
            //     status_detail: 'pending',
            //     total: cookie.get('shoppingTotal')  || 1000,
            //     sendAddress: cookie.get('user')?.user?.sendAddress || null
            // }))
                nav(`/success/?payment_id=${tx.hash}&email=${cookie.get('user').user.email}&status=pending&status_detail=pending`)
            }

        }
        catch ( error ) {
            setState({...state, error: error.message})
        }

    }

    // Se borran los datos en el localStorage
    function logoutMetamask(){
        localStorage.clear()
        nav('/')
        window.location.reload()
    }

  return (
    <>
        
      
        {/* Login Button */}
        <div>
            { props.type === 'login'  && <button className='metaLoginButton' onClick={ () => requestAccount()}><img className='metaLogo' src={metaLogo}></img> {props.loginTextButton}</button>}
        </div>

        {/* Wallet Addres */}
        <div>
            { props.type === 'wallet' && walletAddress ? 'Your Wallet Address: ' + walletAddress : null }
        </div>

        {/* User Balance */}
        <div className='balance'>
            { props.type === 'balance' && userBalance ?   Number.parseFloat(userBalance).toFixed(5) + ' ETH' : null }
        </div>

        {/* Make a transaction */}
            { props.type === 'transaction' && <button className='payMetaButton' onClick={ () => transaction(eth)}>{"Pay: " + eth + ' ETH' }</button>}

        {/* Hash de Transaccion */}
        <div>
            { tx && 'El hash de su transaccion es: ' + tx?.hash}
        </div>

        {/* Logout Button */}
        <div>
            { props.type === 'logout' && walletAddress && <button className='logoutMetaButton' onClick={ () => logoutMetamask() }>Logout Meta</button> }
        </div>

        {/* Dropdown Menu */}
         <div>
            { props.type === 'widget_menu' && walletAddress && 
            <span className='widget_menu' onClick={ () => setState({
                ...state, 
                ishoverWidget_menu: !ishoverWidget_menu
            })} onMouseLeave = { () => setState({
                ...state,
                // ishoverWidget_menu: !ishoverWidget_menu
            })} >
                
                {
                    ishoverWidget_menu ? 
                    // Esto se muestra en el dropdownn
                    <span className='dropdown-widget_menu-true'>
                        <div>{walletAddress.slice(0, 5) + '****' + walletAddress.slice(-4) }</div>
                        <div>{Number.parseFloat(userBalance).toFixed(5)+ ' ETH' }</div>
                        <div>{ walletAddress && <button className='logoutMetaButton' onClick={ () => logoutMetamask() }>Logout Meta</button> }</div>
                        {/* Seguir el formato:  */}
                        {/* <li>Objeto 4</li> */}
                    </span>
                    :
                    // Esto se muestra en el icono de menú de dropdownn
                    <span className='dropdown-widget_menu-false'>
                        <button className='metaLoginButton'>
                            <img className='metaLogo' src={metaLogo} alt="" />
                        </button>
                    </span>
                }

            </span> }
        </div>

        {/* Error Messages */}
        <div> 
            { error && error } 
        </div>

        {/* Last Stored Transaction */}
        { localStorage.getItem('lastTx') && props.showLastTx && <div className='lastTxHash'>Your Last Transaction made hash: {' ' + localStorage.getItem('lastTx')}</div>}
    </>
  );
}

export default ConnectMetamask