import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rootSaga from "./sagas/rootSaga";
import { authSlice, listingSlice } from "./slices";

const reducer = combineReducers({
  auth: authSlice,
  listing: listingSlice,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
