import './DetailProduct.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../redux/actions/productActions"
// import { addProductFavorite } from '../../redux/actions/favoriteActions';
// import { addProduct } from '../../redux/actions/shoppingCartActions';
import { BsSuitHeartFill } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';

const DetailProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector( (state) => state.productReducer.producto)
    const [show, setShow] = useState("")

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id])
    
    const addShoppingCart = () => { 
      // dispatch(addProduct({productId : id, userEmail : email}))
        console.log('agregado al Carrito')
        setShow("carrito")
    }

    const addFavorites = () => { 
      // dispatch(addProductFavorite({ productId: Number(id), email: email}))
        console.log('agregado a Favoritos')
        setShow("favoritos")
    }
    // const stock = product.stock_by_size?.reduce((a,b) => a.stock + b.stock, 0)
    // console.log('stock', stock)
    // console.log('product.stock_by_size', product.stock_by_size[0].stock)
    
    // const stock = addSizes.length > 0 && addSizes?.map((e) => e.stock)?.reduce((a,b) => a + b)

    return (
        <>
            <div>
                {       
                    product 
                    ? 
                    <div className="main-container">
                        <div className="detailProduct-container">
                            <div className="title-category">
                                <p> {'Categoría/'+product?.CategoryName}  </p>
                                <Link to='/home' style={{ color: 'white', fontSize: '20px' }}>
                                    <TiArrowBack/>
                                </Link>
                            </div>
                            <div className="detail-one">
                                <div className="detail-one-left">
                                    <img className="detail-img" src={product.image} alt="zapatilla" />
                                </div>
                                <div className="detail-one-right">
                                    <h1 className="detail-one-name"> {product.name} </h1>
                                    <div className="detail-one-sku">SKU: Item No. NI_{product.id}  </div>
                                    <div className="detail-one-price">${product.price} </div>
                                    <div className="detail-one-cards">Medios de pago</div>
                                    <div className="detail-size">Talles</div>
                                    <div className="detail-one-size">
                                        <div className="sizesMap">
                                        {
                                            product.stock_by_size?.map((size, i) => {
                                                return <div key={i} className="detail-sizes2">
                                                            <span className="sizes2Size"> {size.size}  </span>
                                                                <span className="sizes2NumerOfSize">({size.stock}) </span><br />
                                                        </div>
                                            })
                                        }
                                        
                                        </div>
                                    </div>
                                    <p className={show ? 'producto_agregado' : 'producto_sinagregar'}> 🟢 El producto fue agregado al carrito</p>
                                    <div className="detail-one-buttons">
                                        <button onClick={ () => addShoppingCart()} className="detail-button-buy">
                                            Agregar al carrito
                                        </button>            
                                        <button  onClick={ () => addFavorites()} className="detail-button-like" style={{border: 'none', background: 'none', textDecoration: 'none' }}>
                                            <BsSuitHeartFill/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-two">
                                <div>
                                    <strong>Descripción</strong>
                                </div>
                                <div className="description-right">
                                    <p className="description-top"> {product.description}</p> 
                                    <div className="description-bottom">
                                        <div className="description-bottom-p">
                                            <strong>Marca:</strong> {product.brand} <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                        <div className="loading">
                            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
            }
            </div>
        </>    
    )
}

export { DetailProduct }