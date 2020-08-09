import styled from 'styled-components';
const GiphyPickerWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  padding: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  background: white;
  width: 100%;
  height: 600px;
  z-index: 100;
`;

const GiphyWrapper = styled.div`
  box-sizing: border-box;
  overflow-y: scroll;
  height: calc(100% - 35px);
  margin-top: 5px;
`;

const GiphyWrapperRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

const GiphyColumn = styled.div`
  box-sizing: border-box;
  flex: 50%;
  max-width: 50%;
  padding: 0 4px;
  cursor: pointer;
`;

const Giphy = styled.img`
  border-radius: 3px;
  margin-top: 8px;
  box-sizing: border-box;
  vertical-align: middle;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: inherit;
  font-size: 14px;
  height: auto;
  line-height: 1;
  margin: 0;
  padding: 7px 10px;
  width: 100%;
  display: block;
  &:focus {
    outline: none;
  }
`;
const H1Tag = styled.h1`
  background: radial-gradient(black, transparent);
`;

export {
  GiphyPickerWrapper,
  GiphyWrapper,
  GiphyWrapperRow,
  GiphyColumn,
  Giphy,
  Input,
  H1Tag,
};
