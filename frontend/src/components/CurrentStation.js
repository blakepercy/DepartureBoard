import React from "react";

class CurrentStation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStationCrs: "Default"
    };

    this.departureBoard = props.departureBoard;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedStationCrs: this.departureBoard.getCrs()
    });
  }

  async handleChange(event) {
    await this.setState({selectedStationCrs: event.target.value});
    this.departureBoard.updateCrs(this.state.selectedStationCrs);
  }

  render() {
    return (
        <h2>
          <form onSubmit={this.handleSubmit}>
            <select className="Location-selector" multiple={false} value={this.state.selectedStationCrs} onChange={this.handleChange}>
              <option value="MTB">Matlock Bath</option>
              <option value="DBY">Derby</option>
              <option value="AMB">Ambergate</option>
              <option value="BLP">Belper</option>
              <option value="DFI">Duffield</option>
              <option value="YRK">York</option>
              <option value="MBR">Middlesbrough</option>
              <option value="SLB">Saltburn</option>
              <option value="WDM">Windermere</option>
              <option value="STP">London St Pancras</option>
              <option value="PAD">London Paddington</option>
            </select>
          </form>
        </h2>
    );
  }
}

export default CurrentStation;