import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import Input from '../../components/Input';

import './styles.scss';

class SearchForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  constructor () {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler (e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render () {
    const {
      onSubmit,
      value,
      placeholder,
      className
    } = this.props;

    return (
      <div className={cn(
        'search-form',
        className
      )}>
        <div className="search-form__inner">
          <form className="search-form__area" onSubmit={onSubmit}>
            <div className="search-form__cell search-form__fields">
              <Input
                className="search-form__input"
                type="text"
                onChange={this.onChangeHandler}
                value={value}
                placeholder={placeholder}
              />
            </div>
            <div className="search-form__cell search-form__controls">
              <button type="submit" className="search-form__sbm-btn">
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchForm;
