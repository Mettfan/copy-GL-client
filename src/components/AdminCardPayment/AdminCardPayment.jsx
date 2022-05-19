import { useState } from "react";
import { useDispatch } from "react-redux";
import { putMetaOrder } from "../../redux/actions/metamaskActions";
import "./AdminCardPayment.css";

function AdminCardPayment({
  email,
  order_id,
  total,
  viewOrder,
  status_detail,
  status,
  array,
  metaOrder,
  sendAddress,
  refresh,
}) {
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState(status);

  function goToOrder() {
    if (viewOrder) {
      viewOrder(order_id);
    } else {
      metaOrder(array, sendAddress, status, delivery, total);
    }
  }
  function changeOrder(e) {
    let data = {
      payment_id: order_id,
      email: email,
      newStatus: e.target.value,
      statusDetail: "accepted",
    };
    if (delivery === "Cancelada") {
      setDelivery("Cancelada");
    } else {
      setDelivery(e.target.value);
    }
    if (data) {
      dispatch(putMetaOrder(data));
    }
  }
  return (
    <div className="card_admin_slim">
      <div className="card_admin_slim2">
        <div className="card_admin_information">
          {/* <p className="p_info_admin">Orden N˚{order_id}</p> */}
          <p className="p_info_admin">Total: ${total}</p>
          <p className="p_info_admin">Status Delivery: {delivery}</p>
          <p className="p_info_admin">{email}</p>
        </div>

        <div className="card_admin_slim3">
          <div className="container_buttons">
            <select
              value={delivery}
              className="button_change_order"
              onChange={changeOrder}
            >
              <option value="Creada">Creada</option>
              <option value="Procesando">Procesando</option>
              <option value="Completa">Completa</option>
              <option value="Enviado">Enviado</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <button className="button_change_order" onClick={goToOrder}>
              Ver Orden
            </button>
            <button className="button_cancel_order" onClick={changeOrder}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCardPayment;
