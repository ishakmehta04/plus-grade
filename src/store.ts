import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './sagas/root-saga';
import { rootReducers } from './redux/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
