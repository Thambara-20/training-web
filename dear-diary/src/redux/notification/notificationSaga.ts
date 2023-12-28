import { delay, put, takeLatest } from 'redux-saga/effects';
import { setNotification, incrementElapsedMinutes } from './notificationSlice';


function* updateTimestampSaga() {
    while (true) {
      yield delay(60000); // Wait for 1 minute
      yield put(incrementElapsedMinutes());
    
    }
  }



export function* watchShowtime() {
    yield takeLatest(setNotification, function* (action) {
      const { showtime } = action.payload;
      if (showtime) {
        console.log('showtime');
        yield updateTimestampSaga();
      }
    });
  }

export default watchShowtime;