import React from 'react';
import image from '../images/expand-vertical-4.svg';
import Collapsible from './Collapsible';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: []
    };
  }

  fetchData() {
    this.setState({
      isLoading: true,
      contacts: []
    });

    fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
      .then(res => res.json())
      .then(parsedJson =>
        parsedJson.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          email: user.email,
          location: `${user.location.street}, ${user.location.city}`
        }))
      )
      .then(contacts => this.setState({ contacts, isLoading: false }))
      .catch(err => console.log(err));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
    localStorage.setItem('contactsDate', Date.now());
  }

  componentWillMount() {
    localStorage.getItem('contacts') &&
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
        isLoading: false
      });
  }

  componentDidMount() {
    const date = localStorage.getItem('contactsDate');
    const contactsDate = date && new Date(parseInt(date));
    const now = new Date();

    const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // In minutes
    const tooOld = dataAge >= 2;

    if (tooOld) {
      this.fetchData();
    } else {
      console.log(`Using data from localStorage that is ${dataAge} minutes old`);
    }
  }

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div>
        <header>
          <img src={image} />
          <h1>Collapsible Content</h1>
        </header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="panel-group">
            {!isLoading &&
              contacts.length > 0 &&
              contacts.map(contact => {
                const { username, name, email, location } = contact;
                return (
                  <Collapsible key={username} title={name}>
                    <p>
                      {email}
                      <br />
                      {location}
                    </p>
                  </Collapsible>
                );
              })}
          </div>
          <div className="loader">
            <div className="icon" />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
