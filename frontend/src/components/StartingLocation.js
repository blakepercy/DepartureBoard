import React from 'react';

class StartingLocation extends React.Component {
  constructor(props){
    super(props);
    this.location = props.location;
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  updateLocation(location) {
    this.location = location;
  }

  render() {
    return (
        <div onClick={this.props.update.bind(this, "hello")}>
          <h2>{this.location}</h2>
        </div>
    );
  }
}

export default StartingLocation;