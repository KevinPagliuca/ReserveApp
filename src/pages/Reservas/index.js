import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { removeReserve, updateaAmountRequest } from '../../store/modules/reserve/actions';
import { Link } from 'react-router-dom';

import './styles.css';

const Reservas = () => {
  const dispatch = useDispatch();
  const reserves = useSelector(state => state.reserve);

  function handleRemove(id) {
    dispatch(removeReserve(id));
  }

  function decrementAmount(trip) {
    dispatch(updateaAmountRequest(trip.id, trip.amount - 1));
  }
  function incrementAmount(trip) {
    dispatch(updateaAmountRequest(trip.id, trip.amount + 1));
    console.log(dispatch(updateaAmountRequest(trip.id, trip.amount + 1)))
  }

  return (
    <div>
      <h1 className="title">Você solicitou {reserves.length} {reserves.length != 0 & reserves.length == 1 ? 'reserva' : 'reservas'}</h1>

      {reserves.map(reserve => (

        <div className="reservas" key={reserve.id}>
          <div className="preview">
            <strong>{reserve.title}</strong>
            <img src={reserve.image} alt={reserve.title} />
          </div>

          <div className="amount">
            <button type="button" onClick={() => decrementAmount(reserve)} >
              <MdRemoveCircle size={25} color="#fff" />
            </button>

            <p>{reserve.amount} {reserve.amount > 1 ? 'passagens' : 'passagem'} </p>
            <button type="button" onClick={() => incrementAmount(reserve)}>
              <MdAddCircle size={25} color="#fff" />
            </button>

          </div>
          <button
            type="button"
            onClick={() => handleRemove(reserve.id)}
          >
            <MdDelete size={44} color="#fff" />
          </button>
        </div>

      ))}

      <footer>
        {reserves.length <= 0 ?
          <button><Link to="/">Início</Link></button>
          :
          <button
            type="button"
          >
            Solicitar Reservas
          </button>
        }
      </footer>
    </div>
  );
}

export default Reservas;