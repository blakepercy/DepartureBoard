import React, {Component} from 'react';
import DepartureBoard from './components/DepartureBoard';
import NreLogo from './components/NreLogo';

import './App.css';

class App extends Component {
  render() {
    return (
        <div className="Centre-align">
          <DepartureBoard/>
          <NreLogo height={40}/>
        </div>
    );
  }
}

export default App;
