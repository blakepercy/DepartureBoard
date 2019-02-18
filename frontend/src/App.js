import React, {Component} from 'react';
import DepartureBoard from './components/DepartureBoard.js';
import nreLogo from './images/NRE_Powered_logo.png';

import './App.css';

function Logo(props) {
  return (
      <div className="Left-align Left-padding Top-padding">
        <a href="http://www.nationalrail.co.uk/" target="_blank"
           rel="noopener noreferrer">
          <img src={nreLogo} height={props.height} alt={"National Rail"
          + " Enquiries"}/>
        </a>
      </div>
  );
}

class App extends Component {
  render() {
    return (
        <div className="Centre-align">
          <DepartureBoard/>
          <Logo height={40}/>
        </div>
    );
  }
}

export default App;
