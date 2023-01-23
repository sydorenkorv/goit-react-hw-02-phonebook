import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
      ],
      newdId: '',
      newName: '',
      newPhone: '',
      searchValue: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.newName && this.state.newPhone) {
      const existingContact = this.state.contacts.find(
        contact => contact.name === this.state.newName
      );

      if (existingContact) {
        alert('A contact with that name already exists');
      } else {
        this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            {
              id: nanoid(),
              name: this.state.newName,
              phone: this.state.newPhone,
            },
          ],
          newdId: '',
          newName: '',
          newPhone: '',
        }));
      }
    }
  };

  handleChangeName = e => {
    this.setState({ newName: e.target.value });
  };

  handleChangePhone = e => {
    this.setState({ newPhone: e.target.value });
  };

  handleDelete = index => {
    this.setState(prevState => {
      const newContacts = [...prevState.contacts];
      newContacts.splice(index, 1);
      return { contacts: newContacts };
    });
  };

  handleSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return (
        contact.name
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1
      );
    });
    return (
      <Section title="Phonebook">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={this.state.newName}
              onChange={this.handleChangeName}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Enter phone number"
              value={this.state.newPhone}
              onChange={this.handleChangePhone}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add Contact</button>
        </form>
        <form>
          <label>
            Search:
            <input
              type="text"
              value={this.state.searchValue}
              onChange={this.handleSearch}
            />
          </label>
        </form>
        <div>
          <h2>Contacts</h2>
          <ul>
            {filteredContacts.map((contact, index) => (
              <li key={index}>
                {contact.name} - {contact.phone}
                <button onClick={() => this.handleDelete(contact.name)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }
}
