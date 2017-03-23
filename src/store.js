import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      sagaMiddleware, logger(),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore();

export default store;
