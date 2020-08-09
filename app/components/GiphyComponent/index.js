import React from 'react';
import {
  GiphyPickerWrapper,
  GiphyWrapper,
  GiphyWrapperRow,
  GiphyColumn,
  Giphy,
  Input,
} from '../GiphyStyleComponent';
const GiphyComponent = ({
  searchValue,
  onSearchChange,
  onKeyDown,
  onScroll,
  rowChunks,
}) => {
  return (
    <GiphyPickerWrapper className={'giphy-picker'}>
      <Input
        name="giphy-search"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        onChange={e => onSearchChange(e)}
        value={searchValue}
        onKeyDown={e => onKeyDown(e)}
        placeholder={'Search for GIFs'}
      />
      <GiphyWrapper onScroll={e => onScroll(e)}>
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
  );
};
export default GiphyComponent;
