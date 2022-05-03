import './AdminCreate.css';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createProduct } from "../../redux/actions/productActions";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(5, "Mínimo 5 carácteres"),
    description: Yup.string()
        .required("Este campo es requerido")
        .max(480, "Máximo 480 carácteres")
        .min(2, "Completar campo"),
    category: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(4, "Mínimo 4 carácteres"),
    image: Yup.string()
        .required("Este campo es requerido")
        .matches(RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/), "Ingresar formato URL"),
    price: Yup.string()
        .required("Este campo es requerido")
        .max(8, "Máximo 8 carácteres")
        .min(1, "Mínimo 1 carácteres"),
    discount: Yup.string()
        .required("Este campo es requerido"),
    brand: Yup.string()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(2, "Mínimo 2 carácteres"),
    disabled: Yup.string(),
});

const formOptions = { resolver: yupResolver(formSchema) };

const AdminCreate = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, reset } = useForm(formOptions);
    const nav = useNavigate()
    const [addSizes, setAddSizes] = useState([])
    const [size, setSize] = useState(null)
    const [quantity, setQuantity] = useState("")    
    const sizesState = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', 'L', 'M', 'S', 'XL', 'XS', 'XXL']
    const [sizeShoes, setSizeShoes] = useState(sizesState); 
    const [disabled, setDisabled] = useState(true)

    const onSubmit = (data) => {
        reset();
        nav('/admin')
        const sendData = {...data ,
            "stock_by_size" : addSizes,
            "discount": Number(data.discount),
            "price": Number(data.price)
        }
        dispatch(createProduct(sendData)); 
    };

    const handleSize = (e) => {
        e.preventDefault();
        setAddSizes([
        ...addSizes,
            {"size": size, "stock": Number(quantity)}
        ])
        const filterSize = sizeShoes.filter(e => e !== size).sort()
        setSizeShoes(filterSize)
        setDisabled(true)
        setQuantity("")
    }

    const handleSelectSize = (e) => {
        e.preventDefault();
        setSize(e.target.value)
        setDisabled(false)
    }

    const handleSelectQuantity = (e) => {
        e.preventDefault();
        setQuantity(e.target.value)
    }

    const handleDeleteSize = (e) => {
    e.preventDefault();
    const arrayDelete = [...addSizes]
    arrayDelete.splice(e.target.name, 1)
    setAddSizes(arrayDelete)
    const valor = [...sizeShoes, e.target.value]
    setSizeShoes(valor)
    }

    return (
        <div className="container-register-form-admin">
            <div className="Btn-back-admin">
                <Link className="link-button" to='/admin'><p>Panel admin</p></Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-index">
                    <div className="form-container">
                        <div className="title">Crear producto</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="name"
                                    {...register('name')}
                                />
                                {<div className="form-register-errors">{errors.name?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Descripción: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="description"
                                    {...register('description')}
                                />
                                {<div className="form-register-errors">{errors.description?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Categoría: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="category"
                                    {...register('category')}
                                />
                                {<div className="form-register-errors">{errors.category?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*URL de imagen: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="image"
                                    {...register('image')}
                                />
                                {<div className="form-register-errors">{errors.image?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Precio: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="price"
                                    {...register('price')}
                                />
                                {<div className="form-register-errors">{errors.price?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">Descuento en N%: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="discount"
                                    {...register('discount')}
                                />
                                {<div className="form-register-errors">{errors.discount?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Marca: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="brand"
                                    {...register('brand')}
                                />
                                {<div className="form-register-errors">{errors.brand?.message}</div>}
                            </div>
                            <div className="disabled-details-create-admin">
                                <input type="radio" name="disabled" value="false" id="dot-1" {...register('disabled')} />
                                <input type="radio" name="disabled" value="true" id="dot-2" {...register('disabled')} />
                                <span className="disabled-title">Habilitar / Deshabilitar</span>
                                <div className="category">
                                    <label htmlFor="dot-1">
                                        <span className="dot one"></span>
                                        <span className="disabled">Habilitado</span>
                                    </label>
                                    <label htmlFor="dot-2">
                                        <span className="dot two"></span>
                                        <span className="disabled">Deshabilitado</span>
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div className="container-stock">
                            <button className="button-create-stock" disabled={disabled} onClick={(e)=> handleSize(e)}>Agregar talle</button>
                        
                            <select className="select-create-stock" onChange={(e)=> handleSelectSize(e)}>
                                {
                                    sizeShoes?.map((e, i) => {
                                        return(
                                            <option key={i} value={e}>{e}</option>
                                            )
                                        })
                                    }
                            </select>
                            <div className="labelAndInput-stock">
                                <input
                                    className="input-create-stock"
                                    type="text"
                                    placeholder="Stock"
                                    onChange={(e)=>handleSelectQuantity(e)}
                                    value={quantity}
                                />
                            </div>
                        </div>
                        <div className="labelAndInput-stock-finally">
                            {
                                addSizes?.map((e,i) => {
                                    return(
                                        <button onClick={(e) => handleDeleteSize(e)} name={i} value={e.size} key={i}>{e.size} : {e.stock}u</button>
                                        )
                                })
                            }
                        </div>
                        <div className="form-submit">
                            <input
                                type="submit"
                                value="CREAR PRODUCTO"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { AdminCreate }