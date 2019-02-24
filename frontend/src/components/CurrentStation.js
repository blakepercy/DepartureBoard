import React from "react";

class CurrentStation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      station: props.station,
      selectedStationCrs: "Default"
    };

    this.mountCallback = props.mountCallback;
    this.changeCrsCallback = props.changeCrsCallback;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.mountCallback(this);
  }

  handleClick(event) {
    this.setState(
      {
        station: (
          <form onSubmit={this.handleSubmit}>
            <select className="Location-header" multiple={true} value={this.state.selectedStationCrs} onChange={this.handleChange}>
              <option value="MTB">Matlock Bath</option>
              <option value="DBY">Derby</option>
              <option value="SLB">Saltburn</option>
            </select>
          </form>
        )
      }
    );
  }

  async handleChange(event) {
    await this.setState({selectedStationCrs: event.target.value});
    this.handleClick(event);
    this.changeCrsCallback(this.state.selectedStationCrs);
  }

  setStation(station) {
    this.setState({
      station: station
    });
  }

  render() {
    return (
        <div onClick={this.handleClick}>
          <h2>{this.state.station}</h2>
        </div>
    );
  }
}

export default CurrentStation;