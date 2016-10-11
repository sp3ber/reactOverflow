import React, { PropTypes, Component } from 'react';
import cn from 'classnames';
import EmptySearchIco from '../icons/SearchError';

import './styles.scss';

const InvalidSearchResult = (props) => {
  const { title, className, warnText } = props;
  return (
    <div className={cn(
      'search-error',
      className
    )}>
      <div className="search-error__ico-wrapper">
        <EmptySearchIco className="search-error__ico" />
      </div>
      <div className="search-error__title">
        { title }
      </div>
      <div className="search-error__text">
        { warnText }
      </div>
    </div>
  );
};

InvalidSearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  warnText: PropTypes.string,
  className: PropTypes.string
};

export default InvalidSearchResult;
