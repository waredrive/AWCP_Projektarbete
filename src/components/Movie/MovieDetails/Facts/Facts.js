import React, { Component } from 'react';
import './Facts.module.css';

export class Facts extends Component {
  formatEmptyFields = field => {
    if (!field) {
      return '-';
    }
    return field;
  };

  convertRuntimeToHoursAndMinutes = runtime => {
    if (!runtime) {
      return '-';
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  formatCurrency = amount => {
    if (!amount) {
      return '-';
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  render() {
    const { movie } = this.props;
    return (
      <div
        className="col-3 my-3 mt-5 text-light"
        style={{ backgroundColor: '#5C6165' }}
      >
        <div className="ml-3 mt-3">
          <h5>Facts</h5>
          <div>
            <h6>Status</h6>
            <p>{this.formatEmptyFields(movie.status)}</p>
          </div>
          <div>
            <h6>Runtime</h6>
            <p>{this.convertRuntimeToHoursAndMinutes(movie.runtime)}</p>
          </div>
          <div>
            <h6>Budget</h6>
            <p>{this.formatCurrency(movie.budget)}</p>
          </div>
          <div>
            <h6>Revenue</h6>
            <p>{this.formatCurrency(movie.revenue)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Facts;
