import { createAction } from '@reduxjs/toolkit';

const fetchContactRequest = createAction('phonebook/FetchContactRequest');
const fetchContactSuccess = createAction('phonebook/FetchContactSuccess');
const fetchContactError = createAction('phonebook/FetchContactError');

const addContactRequest = createAction('phonebook/AddContactRequest');
const addContactSuccess = createAction('phonebook/AddContactSuccess');
const addContactError = createAction('phonebook/AddContactError');

const deleteContactRequest = createAction('phonebook/DeleteContactRequest');
const deleteContactSuccess = createAction('phonebook/DeleteContactSuccess');
const deleteContactError = createAction('phonebook/DeleteContactError');

const changeFilter = createAction('phonebook/FilteredContact');

export const actions = {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  changeFilter,
};
