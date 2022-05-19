
import './Favorites.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from '../../redux/actions/favoritesActions';
import CardFavorites from '../CardFavorites/CardFavorites';
import Cookies from "universal-cookie";

export default function Favorites ( ) {
    let nav = useNavigate()
    let cookie = new Cookies();
    const user = cookie.get('user')?.user
    const favoriteCookie = cookie.get('favorite')
    const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
    const dispatch = useDispatch()
    const [msg, setMsg] = useState("")
    const [refreshCardFavorites, setRefreshCardFavorites] = useState(false)

    const deleteProductFavorite = () => {
        setRefreshCardFavorites(!refreshCardFavorites)
    }

    useEffect(()=> {
        dispatch(getFavorites({ email : user?.email }))
    }, [])

    const handleNewsletter = async () => {
        if(user){
            await axios.post('http://localhost:3001/usuario/newsletterfavorites', {
                "email": user?.email
            }).then( response => {
                const msg = response.data.msg;
                setMsg(msg);
            },
            (error) => {
                setMsg("Email no válido");
            })
        }else{
            setMsg("Debe iniciar sesión para recibir info de sus productos favoritos")
        }
    }

    return (<>
        {
            productsFavorites?.length || favoriteCookie?.length
            ?
            <div className="fav-cart-container">
                <div className="into-container-fav">
                    <div className="cart-container-1">
                        <div className="title-container-fav">
                            <h2>FAVORITOS</h2>
                        </div>
                            { productsFavorites.length 
                                ?   productsFavorites?.map((product, i) => {
                                        return <CardFavorites 
                                        key= { i }
                                        index= { i }
                                        image= { product?.image }
                                        name= { product?.name }
                                        stock_by_size= { product?.stock_by_size }
                                        id= { product?.id }
                                        discount= { product?.discount }
                                        price= { product?.price }
                                        />
                                    }) 
                                :   favoriteCookie?.map((product, i) => {
                                        return <CardFavorites 
                                        key= { i }
                                        index= { i }
                                        image= { product?.image }
                                        name= { product?.name }
                                        stock_by_size= { product?.stock_by_size }
                                        id= { product?.id }
                                        discount= { product?.discount }
                                        price= { product?.price }
                                        deleteProductFavorite= {deleteProductFavorite}
                                        />
                                    }) 
                            }
                            <p className={msg ? 'newsletter_agregado_favorites' : 'producto_sinagregar'}>{msg}</p>
                        </div>

                </div>
            </div>
            : 
                <div className="shopping-cart-empty">
                    <p>Tus favoritos se encuentra vacío</p>
                    <button className='register-btn' onClick={() => nav('/home')}>
                            Volver al catalogo
                    </button>                
                </div>        }

    </>)
}