import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
  flex-direction: ${props => (props.flexColumn && 'column') || 'row'};
  min-width: ${props => props.minWidth || '320px'};
  margin: ${props => props.marginWrapper || '15px 15px 0px 15px'};
  background: ${props => props.background || 'none'};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`;

export default Wrapper;
