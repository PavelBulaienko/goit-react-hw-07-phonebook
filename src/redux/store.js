import { configureStore, getDefaultMiddleware, createReducer } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { actions } from './actions';
import {
  // persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'contactList',
//   storage,
// };

// const contacts = {
//   items: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filter: [],
// };

const contacts = [];

const reducer = createReducer(contacts, {
  [actions.fetchContactSuccess]: (_, { payload }) => {
    return { items: payload };
  },
  [actions.addContactSuccess]: ({ items }, { payload }) => {
    return { items: [...items, payload] };
  },
  // [actions.deleteContactSuccess]: ({ items }, { payload }) => {
  //   return [...items.filter((contact) => contact.id !== payload)];
  // },
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

// const persistor = persistStore(store);

export default store;
