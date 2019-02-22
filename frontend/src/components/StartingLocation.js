import React from 'react';

class StartingLocation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: props.location
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.location}</h2>
      </div>
    );
  }
}

export default StartingLocation;