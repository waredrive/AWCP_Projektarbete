import React, { Component } from 'react';
import ISO6391 from 'iso-639-1';
import './Facts.module.css';

export class Facts extends Component {
  formatEmptyFields = (field, functionToRunAfter) => {
    if (!field) {
      return '-';
    }
    if (!functionToRunAfter) {
      return field;
    }
    return functionToRunAfter(field);
  };

  convertRuntimeToHoursAndMinutes = runtime => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  formatCurrency = amount => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  render() {
    const { movie } = this.props;

    const genres =
      movie.genres && movie.genres.length > 0
        ? movie.genres.map(genre => (
            <button
              type="button"
              key={genre.id}
              className="btn btn-light btn-sm mr-2 mt-2 disabled"
            >
              {genre.name.toUpperCase()}
            </button>
          ))
        : null;

    return (
      <div className="ml-3 my-3">
        <h5>Facts</h5>
        <div>
          <h6>Status</h6>
          <p>{this.formatEmptyFields(movie.status)}</p>
        </div>
        <div>
          <h6>Release date</h6>
          <p>{this.formatEmptyFields(movie.release_date)}</p>
        </div>
        <div>
          <h6>Runtime</h6>
          <p>
            {this.formatEmptyFields(
              movie.runtime,
              this.convertRuntimeToHoursAndMinutes
            )}
          </p>
        </div>
        <div>
          <h6>Original Language</h6>
          <p>
            {this.formatEmptyFields(movie.original_language, ISO6391.getName)}
          </p>
        </div>
        <div>
          <h6>Budget</h6>
          <p>{this.formatEmptyFields(movie.budget, this.formatCurrency)}</p>
        </div>
        <div>
          <h6>Revenue</h6>
          <p>{this.formatEmptyFields(movie.revenue, this.formatCurrency)}</p>
        </div>
        <div>
          <h6>Genres</h6>
          {this.formatEmptyFields(genres)}
        </div>
      </div>
    );
  }
}

export default Facts;
