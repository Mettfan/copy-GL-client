import { useEffect, useState } from "react"
import './AdminGetProducts.css'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../redux/actions/productActions"
import AdminCardProduct from "../../components/AdminCardProduct/AdminCardProduct"

export default function AdminGetProducts ({activeDrawer, receiveProduct}) {
    const productos = useSelector( (state) => state.productReducer.productos )
    const status = useSelector( (state) => state.productReducer.status )
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const filterCategory = productos?.map(( product, i ) => product.CategoryName)
    const categories = new Set(filterCategory)
    const arrayCategories = [...categories]

    const productEnabled = productos.filter(p => p.disabled === false) 
    const productViews = selectCategory === "" 
        ? productEnabled 
        : productEnabled.filter(p => p.CategoryName === selectCategory)

    const searchProductViews = productViews.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()))

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch, status])

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSelect = (e) => {
        e.preventDefault();
        setSelectCategory(e.target.value)
        setSearch("")
    }

    return (
    <div className="container-get-products"> 

        <div className="title-search">
            <h1>Artículos</h1>
            <select className="select-get-product" onChange={(e)=> handleSelect(e)}>
                <option value="">Todos</option>
                {arrayCategories?.map( (category, i) => 
                    {
                        return <option key={i} value={category}>{category}</option>
                    }    
                    )
                }
            </select>
                <form>
                    <input
                        id="form"
                        type="text"
                        placeholder="Busca tu articulo"
                        className="input-get-product"
                        value={search}
                        onChange ={(e) => {handleInputChange(e)}}
                    />
                </form>
        </div>
        <div className="container-articulos">
            <div>
                {productos.length 
                    ?   <div>
                            {searchProductViews.length 
                                ?   <div>
                                        {searchProductViews.reverse()?.map( (producto, i) => 
                                            <AdminCardProduct 
                                                key = {i}
                                                image= {producto.image}
                                                name= {producto.name}
                                                stock_by_size= {producto.stock_by_size}
                                                price= {producto.price}
                                                activeDrawer= {activeDrawer}
                                                id= {producto.id}
                                                producto= {producto}
                                                receiveProduct= {receiveProduct}
                                                disabled= {producto.disabled} 
                                            />
                                        )}
                                    </div>
                                :   <p className="text-no-products">No se encontraron artículos con ese nombre</p>
                            }
                        </div>
                        
                    : <p className="text-no-products">Loading...</p>
                }
            </div>
            
        </div>
    </div>)
}