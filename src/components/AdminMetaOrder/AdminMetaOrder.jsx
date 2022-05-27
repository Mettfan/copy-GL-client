import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMetaOrders } from "../../redux/actions/metamaskActions";
import "./AdminMetaOrder.css";

function AdminMetaOrder({ producto, back, sendAddress }) {
  const dispatch = useDispatch();

  function backAction() {
    back();
  }
  useEffect(() => {
    dispatch(getMetaOrders());
  }, [dispatch]);
  return (
    <div className="container_views">
      <div className="info_views">
        {/* <h4>Orden N-{`${id.id}`}</h4> */}
        <div className="container_productos_view">
          {producto?.map((e, i) => {
            return (
              <div className="container_info">
                <div className="clase_name">
                  <p>{e.name}</p>
                </div>
                <div className="clase_quan">
                  <p>x{e.UserProduct.quantity}</p>
                </div>
                <div className="clase_price">
                  <p>${e.price * e.UserProduct.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container_total">
          <p>subtotal</p>
          {<p>${`${sendAddress?.total}`}</p>}
        </div>
          <hr></hr>
          <h1>Datos de envío</h1>
        <div className="container_info_user">
          <div className="container_user_descripcion">
            <p className="change_p">
              Nombre: {`${sendAddress?.sendAddress.name}`}
            </p>
            <p className="change_p">
              Apellido: {`${sendAddress?.sendAddress.lastName}`}
            </p>
            <p className="change_p">
              Direccion: {`${sendAddress?.sendAddress.address}`}
            </p>
            <p className="change_p">
              Codigo postal: {`${sendAddress?.sendAddress.postal}`}
            </p>
          </div>
          <div className="container_user_descripcion">
            <p className="change_p">
              Provincia: {`${sendAddress?.sendAddress.province}`}
            </p>
            <p className="change_p">
              Telefono: {`${sendAddress?.sendAddress.phone}`}
            </p>
            <p className="change_p">Delivery: {`${sendAddress?.delivery}`}</p>
            <p className="change_p">Status: {`${sendAddress?.status}`}</p>
          </div>
        </div>
          <hr></hr>
        <button onClick={backAction} className="button_back_change">
          Volver
        </button>
      </div>
    </div>
  );
}

export default AdminMetaOrder;