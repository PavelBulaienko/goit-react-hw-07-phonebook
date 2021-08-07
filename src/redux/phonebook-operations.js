import axios from 'axios';
import { actions } from './actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => (dispatch) => {
  dispatch(actions.fetchContactRequest());

  axios
    .get('./contacts')
    .then(({ data }) => dispatch(actions.fetchContactSuccess(data)))
    .catch((error) => dispatch(actions.fetchContactError(error)));
};

const addContact = (contact) => (dispatch) => {
  dispatch(actions.addContactRequest());

  axios
    .post('./contacts', contact)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch((error) => dispatch(actions.addContactError(error)));
};

const deleteContact = (contactId) => (dispatch) => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`./contacts/${contactId}`)
    .then(() => dispatch(actions.deleteContactSuccess(contactId)))
    .catch((error) => dispatch(actions.deleteContactError(error)));
};

const filterContacts = (contact) => (dispatch) => {
  dispatch(actions.changeFilter());
};

export const operations = {
  addContact,
  deleteContact,
  fetchContacts,
  filterContacts,
};
