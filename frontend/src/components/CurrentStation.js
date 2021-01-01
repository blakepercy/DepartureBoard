import React from "react";

class CurrentStation extends React.Component {
  constructor(props) {
    super(props);

    this.selectedStationCrs = props.crs;
    this.updateDepartureBoardCrs = props.updateCrs;
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.selectedStationCrs = event.target.value;
    this.updateDepartureBoardCrs(event.target.value);
  }

  render() {
    return (
        <h2>
          <form onSubmit={this.handleSubmit}>
            <select className="Location-selector" multiple={false} value={this.selectedStationCrs} onChange={this.handleChange}>
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