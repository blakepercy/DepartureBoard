import React from 'react';
import nreLogo from "../images/NRE_Powered_logo.png";

class NreLogo extends React.Component {
  constructor(props) {
    super(props);
    this.height = props.height;
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
        <div className="Right-align Right-padding Top-padding">
          <a href="http://www.nationalrail.co.uk/" target="_blank"
             rel="noopener noreferrer">
            <img src={nreLogo} height={this.height} alt={"National Rail"
            + " Enquiries"}/>
          </a>
        </div>
    );
  }
}

export default NreLogo;