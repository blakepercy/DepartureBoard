import React from 'react';

class RowQuantitySelector extends React.Component {
  constructor(props) {
    super(props);

    this.departureBoard = props.departureBoard;

    this.state = {
      rowCount: 5
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      rowCount: event.target.value
    });

    this.departureBoard.updateRows(event.target.value);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label><b>Rows to Display: </b></label>
          <select className="Row-selector" multiple={false} value={this.state.rowCount} onChange={this.handleChange}>
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