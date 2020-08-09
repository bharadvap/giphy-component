/**
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Wrapper from 'components/Wrapper';
import GiphyComponent from '../../components/GiphyComponent/Loadable';
import { H1Tag } from '../../components/GiphyStyleComponent';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.fetchSearch = debounce(this.fetchSearch, 500);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrendingGifs();
  }

  onSearchChange = event => {
    let searchValue = event.target.value;
    event.stopPropagation();
    this.setState({
      searchValue,
      page: 0,
      gifs: [],
    });
    this.fetchSearch(searchValue);
  };

  fetchSearch(value) {
    this.props.fetchTrendingGifs(value);
  }

  onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.reset();
    }
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  onScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    let currentPage = this.props.homepage.gifs.currentPage;
    let totalPages = this.props.homepage.gifs.totalPages;
    if ((currentPage += 1 > totalPages && totalPages > 0) && bottom) {
      this.props.fetchNextTrendingGifs(
        this.state.searchValue,
        (currentPage += 1),
      );
    }
  }

  render() {
    const { gifs } = this.props.homepage;
    const data =
      gifs &&
      gifs.data &&
      gifs.data.map(gif => {
        return gif.images;
      });
    const rowChunks = data && _.clone(data);
    return (
      <Wrapper flexColumn>
        <H1Tag>Giphy</H1Tag>
        <GiphyComponent
          searchValue={this.state.searchValue}
          onSearchChange={this.onSearchChange}
          onKeyDown={this.onKeyDown}
          onScroll={this.onScroll}
          rowChunks={_.chunk(rowChunks, 9)}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTrendingGifs: (search, page) => {
      dispatch(actions.fetchTrendingGifs(search, page));
    },
    fetchNextTrendingGifs: (search, page) => {
      dispatch(actions.fetchNextTrendingGifs(search, page));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
