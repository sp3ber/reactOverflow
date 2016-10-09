import React, { PropTypes } from 'react';
import cn from 'classnames';

import './styles.scss';

const Input = (props) => {

  const { className, ...inputProps } = props;

  return (
    <div className={cn(
      'form-input'
    )}>
      <input
        {...inputProps}
        className={cn(
          'form-input__area',
          className
        )} />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string
};

export default Input;
