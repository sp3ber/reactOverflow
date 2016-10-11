import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import './styles.scss';

const Button = (props) => {
  const { className, isLoading, children, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={cn(
        'button',
        'loader',
        className
      )}
    >
      {children}
      {
        !!isLoading &&
          <div className="button__loader" />
      }
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

export default Button;
