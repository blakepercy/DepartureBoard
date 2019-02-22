import React from 'react';

class StartingLocation extends React.Component {
  constructor(props){
    super(props);
    this.location = props.location;
    this.updateCallback = props.update;
  }

  updateLocation(location) {
    this.location = location;
  }

  render() {
    return (
        <div onClick={this.updateCallback}>
          <h2>{this.location}</h2>
        </div>
    );
  }
}

export default StartingLocation;