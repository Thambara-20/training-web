import { addCardByUser } from './diaryCardSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { eventChannel } from "redux-saga";
import { watchingCards } from "./diaryCardSlice";
import { setCards } from './diaryCardSlice';
import { takeLatest, put, call, cancelled, take } from "redux-saga/effects";
import { onSnapshot, collection, addDoc, query, where } from "firebase/firestore";
import db from "../../config/firebaseIntegration";
import { Card, SubmitCard } from '../../utilities/types';

function* addCardSaga(action: PayloadAction<SubmitCard>) {
    try {

        const card = action.payload;
        const cardsCol = collection(db, 'diary-cards');

        yield addDoc(cardsCol, card);




    }
    catch (error) {
        console.log(error);
    }
}

function createEventChannel(userName: PayloadAction<String>) {

    return eventChannel<Card[]>((emit) => {
        const q = query(collection(db, "diary-cards"), where("userName", "==", userName.payload))
        console.log(q);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cards: Card[] = snapshot.docs.map((doc) => {
                const data = doc.data() as Card;
                return {
                    id: doc.id,
                    title: data.title,
                    body: data.body,
                };
            });
            emit(cards);
        }
        );

        return unsubscribe;
    });
}

function* watchCards(userName: PayloadAction<String>): Generator<any, void, ReturnType<typeof createEventChannel>> {
    const channel = yield call(createEventChannel, userName);
    try {
        while (true) {
            const updatedCards: any = yield take(channel);
            yield put(setCards(updatedCards));
        }
    } finally {
        if (yield cancelled()) {
            channel.close();
        }
    }
}

function* Gen() {

    yield takeLatest(addCardByUser, addCardSaga);
    yield takeLatest(watchingCards, watchCards);
}

export default Gen;
