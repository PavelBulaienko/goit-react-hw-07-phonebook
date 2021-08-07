import { React } from 'react';
import { connect } from 'react-redux';
import { operations } from '../redux/phonebook-operations';
import { getVisibleContacts } from '../redux/phonebook-selectors';

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

const mapStateToProps = (state) => ({
  contacts: getVisibleContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (contactID) => dispatch(operations.deleteContact(contactID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
