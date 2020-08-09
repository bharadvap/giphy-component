import React from 'react';
import { IntlProvider } from 'react-intl';
import { shallow } from 'enzyme';
import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <NotFoundPage />
      </IntlProvider>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
