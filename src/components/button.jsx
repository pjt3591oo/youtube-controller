import styled from 'styled-components';

export default styled.button`
  background: #627D67;
  border: 1px solid #627D67;
  padding: 12px;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  box-sizing: border-box;
  border-radius: 5px;

  &: hover {
    opacity: 1;
  }
  width: ${props => props.half ? '50%' : 'auto'};
`