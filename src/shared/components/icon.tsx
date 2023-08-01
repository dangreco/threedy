/* eslint-disable  */
import { FunctionComponent } from 'preact';
import { styled } from 'styled-components';

interface Props {
  icon?: string;
  size?: number;
  color?: string;
}

export const Icon: FunctionComponent<Props> = ({ size, icon, color }) => {
  return <IconBase color={color} size={size} icon={icon} />;
};

export const IconBase = styled('ha-icon')`
  color: ${(props: Props) => props.color ?? 'inherit'};
  width: ${(props: Props) => `${props.size ?? 24}px`};
  height: ${(props: Props) => `${props.size ?? 24}px`};
  --mdc-icon-size: ${(props) => `${props.size ?? 24}px`};
`;
