import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter'


export class App extends Component {
  
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
    
  };

  handleContactsChange = (obj) => {
    const { contacts } = this.state;
    const {name: nameUser} = obj;
    obj.id = nanoid();
    if(contacts.some(({name}) => name.includes(nameUser))) {
      alert(`${nameUser} is already in contact`);
    }else {
      this.setState({contacts: [...contacts, obj]});
    }
    
  };

  handleContactsDelete = (id) => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(({id: idUser}) => idUser !== id);
    this.setState({contacts: newContacts});
  }

  handleFilter(value) {
   
    const { filter, contacts } = this.state;
    if(filter){
      return contacts.filter(({name}) => {
        return name.toLowerCase().includes(value.toLowerCase());
      })
    }

  }
  

  render() {
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
          <ContactForm contactsChange={this.handleContactsChange} />
          <h2>Contacts</h2>
        <Filter filter={filter} filterChange={this.handleChange}/>
        {/* <ContactList  /> */}
        
        <Contacts contacts={this.handleFilter(filter)} fnDelete={this.handleContactsDelete}/>
      
      </div>
      
    )
  }
};


     