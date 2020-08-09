import React from 'react';
import { Iterable } from 'immutable';

export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
      const otherProps = newProps;
      otherProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE],
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE];
      return otherProps;
    },
    {},
  );
  return <WrappedComponent {...propsJS} />;
};
