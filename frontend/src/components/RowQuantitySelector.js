import React from 'react';

class RowQuantitySelector extends React.Component {
  constructor(props) {
    super(props);

    this.rowCount = props.rowCount;
    this.handleChange = this.handleChange.bind(this);
    this.updateDepartureBoardRowState = props.updateRowState;
  }

  handleChange(event) {
    this.rowCount = event.target.value;
    this.updateDepartureBoardRowState(event.target.value);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label><b>Rows to Display: </b></label>
          <select className="Row-selector" multiple={false} value={this.rowCount} onChange={this.handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </form>
    );
  }
}

export default RowQuantitySelector;