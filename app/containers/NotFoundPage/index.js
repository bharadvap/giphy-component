/**
 * NotFoundPagePage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import WrapperCenter from 'components/WrapperCenter';

/* eslint-disable react/prefer-stateless-function */
class NotFoundPage extends React.PureComponent {
  render() {
    return <WrapperCenter>Page Not found</WrapperCenter>;
  }
}

NotFoundPage.propTypes = {
  // history: PropTypes.object.isRequired,
  // intl: PropTypes.object.isRequired,
};

export default injectIntl(NotFoundPage);
