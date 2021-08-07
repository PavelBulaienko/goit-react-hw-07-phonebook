import { configureStore, getDefaultMiddleware, createReducer } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { actions } from './actions';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const contacts = [];

const reducer = createReducer(contacts, {
  [actions.fetchContactSuccess]: (_, { payload }) => {
    return { items: payload };
  },
  [actions.addContactSuccess]: ({ items }, { payload }) => {
    return { items: [...items, payload] };
  },
  [actions.deleteContactSuccess]: ({ items }, { payload }) => {
    return { items: [...items.filter((contact) => contact.id !== payload)] };
  },
});

const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: {
    contacts: reducer,
    filter,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
