import styled from 'styled-components';

const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => props.flexDirection || 'column'};
`;

export default WrapperCenter;
