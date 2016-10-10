import React, { PropTypes, Component } from 'react';
import cn from 'classnames';
import EmptySearchIco from '../icons/SearchError';

import './styles.scss';

class InvalidSearchResult extends Component {
  render () {
    const { title, className, warnText, isError } = this.props;
    return (
      <div className={cn(
        'search-error',
        { 'search-error--has-error': isError },
        className
      )}>
        <div className="search-error__ico-wrapper"><EmptySearchIco className="search-error__ico"/></div>
        <div className="search-error__title">
          { title }
        </div>
        <div className="search-error__text">
          { warnText
            ? warnText
            : ( isError
            ? <a className="search-error__backlink" href="/">Search Error</a>
            : '' )
          }
        </div>
      </div>
    );
  }
}

InvalidSearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  warnText: PropTypes.string,
  isError: PropTypes.bool
};

export default InvalidSearchResult;
