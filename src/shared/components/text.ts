import { styled } from 'styled-components';

export const Text = styled.p<{ bold?: boolean }>`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;

export const Caption = styled.p<{ bold?: boolean }>`
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--secondary-text-color);
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;
