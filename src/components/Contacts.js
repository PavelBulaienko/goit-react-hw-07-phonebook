import { React } from 'react';
import { connect } from 'react-redux';
import { operations } from '../redux/phonebook-operations';

const Contacts = ({ contacts, deleteContact }) => (
  <ul className="nameList">
    {contacts &&
      contacts.map(({ id, name, number }) => (
        <li key={id} className="item">
          <p className="name">
            {name}: {number}
          </p>
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
  </ul>
);

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  if (allContacts) {
    return allContacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  }
};

const mapStateToProps = (state) => ({
  contacts: getVisibleContacts(state.contacts.items, state.filter),
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (contactID) => dispatch(operations.deleteContact(contactID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
