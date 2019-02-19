import React from 'react';

class StartingLocation extends React.Component {
  constructor(props){
    super(props);
    this.location = props.location;
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
        <div>
          <h2>{this.location}</h2>
        </div>
    );
  }
}

export default StartingLocation;