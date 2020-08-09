/**
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Wrapper from 'components/Wrapper';
import {
  GiphyPickerWrapper,
  GiphyWrapper,
  GiphyWrapperRow,
  GiphyColumn,
  Giphy,
  Input,
  H1Tag,
} from '../../components/GiphyComponent';
import Picker from 'react-giphy-component';
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
    console.log(currentPage, totalPages);
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
    const rowChunks = data && data.clone().chunk(9);
    return (
      <Wrapper flexColumn>
        <H1Tag>Giphy</H1Tag>
        <GiphyPickerWrapper className={'giphy-picker'}>
          <Input
            name="giphy-search"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            onChange={this.onSearchChange}
            value={this.state.searchValue}
            onKeyDown={this.onKeyDown}
            placeholder={'Search for GIFs'}
          />
          <GiphyWrapper onScroll={e => this.onScroll(e)}>
            <GiphyWrapperRow>
              {rowChunks &&
                rowChunks.map((data, i) => {
                  return (
                    <GiphyColumn key={i}>
                      {data.map((g, j) => {
                        let gifUrl = g.fixed_height.url;
                        return (
                          <Giphy
                            key={j}
                            style={{
                              width: '100%',
                              height: Number(g.fixed_height.height),
                            }}
                            src={gifUrl}
                          />
                        );
                      })}
                    </GiphyColumn>
                  );
                })}
            </GiphyWrapperRow>
          </GiphyWrapper>
        </GiphyPickerWrapper>
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
