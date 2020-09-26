import { select, all, call, put, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateaAmountSuccess } from './actions';
import api from '../../../services/api';

function* addToReserve({ id }) {
  const tripExist = yield select(
    state => state.reserve.find(trip => trip.id === id)
  );

  const myStock = yield call(api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  const currentStock = tripExist ? tripExist.amount : 0;

  const amount = currentStock + 1;

  if (amount > stockAmount) {
    alert('Quantidade maxiam atingida.');
    return;
  }

  if (tripExist) {
    yield put(updateaAmountSuccess(id, amount));

  } else {
    const response = yield call(api.get, `trips/${id}`);

    const data = {
      ...response.data,
      amount: 1,
    }

    yield put(addReserveSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if(amount <= 0) return;

  const myStock = yield call(api.get, `/stock/${id}`);
  
  const stockAmount = myStock.data.amount;

  if(amount > stockAmount) {
    alert('Quantidade máxima atingida.');
  }

  yield put(updateaAmountSuccess(id, amount));

}

export default all([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
]);