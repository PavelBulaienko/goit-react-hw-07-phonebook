import { Component } from 'react';
import Contacts from './Contacts';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { actions } from '../redux/actions';
import { operations } from '../redux/phonebook-operations';
import { getContacts } from '../redux/phonebook-selectors';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleInputContact = (e) => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <>
        <form className="form">
          <label className="nameLabel">Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.handleInputName}
            className="nameInput"
          />
          <label className="numberLabel">Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.handleInputContact}
            className="numberInput"
          />
          <button
            type="button"
            onClick={() =>
              this.props.addContact({
                name: this.state.name,
                id: shortid.generate(),
                number: this.state.number,
              })
            }
          >
            Add contact
          </button>
        </form>
        <h2>Contacts: </h2>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={this.props.handleFilter}
          className="nameFilter"
        />
        {this.props.contacts && <Contacts contacts={this.props.contacts} />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: getContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(operations.fetchContacts()),
  addContact: (contact) => dispatch(operations.addContact(contact)),
  filterContacts: (contacts) => dispatch(operations.filteredContact(contacts)),
  handleFilter: (e) => dispatch(actions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
