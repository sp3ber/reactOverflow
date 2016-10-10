import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import Input from '../../components/Input';

import './styles.scss';

class SearchForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  state = {
    value: this.props.initialValue || ''
  };

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  onChangeHandler(e) {
    const value = e.target.value;
    if (this.props.onChange ) {
      this.props.onChange(value);
    }
    return this.setState({
      value
    });
  }

  componentWillReceiveProps (newProps) {
    if (newProps.initialValue !== this.props.initialValue) {
      this.setState({
        value: newProps.initialValue
      });
    }
  }

  render() {
    const {
      placeholder,
      className
    } = this.props;

    return (
      <div className={cn(
        'search-form',
        className
      )}>
        <div className="search-form__inner">
          <form className="search-form__area" onSubmit={this.onSubmitHandler}>
            <div className="search-form__cell search-form__fields">
              <Input
                className="search-form__input"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.value}
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
