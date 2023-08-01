import { FunctionComponent } from 'preact';
import { styled } from 'styled-components';

import colors from '@shared/colors';

// import colors from '@shared/colors';

interface BaseProps {
  square?: boolean;
  disabled?: boolean;
  color?: { o: string; t: string };
  backgroundColor?: string;
}

type Props = BaseProps & {
  onClick?(): unknown;
  critical?: boolean;
};

const VOID = () => {};

export const Button: FunctionComponent<Props> = (props) => {
  const ON_CLICK = props.onClick ?? VOID;

  const color = props.disabled ? colors.disabled : props.critical ? colors.error : colors.default;

  return (
    <ButtonBase
      onClick={props.disabled ? VOID : ON_CLICK}
      square={props.square}
      color={color}
      disabled={props.disabled}
    >
      {props.children}
    </ButtonBase>
  );
};

const ButtonBase = styled.div<BaseProps>`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  height: 42px;
  width: ${(props) => (props.square ? '42px' : 'auto')};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.color ? props.color.o : 'initial')};
  background-color: ${(props) =>
    props.color ? props.color.t : 'rgba(var(--rgb-primary-text-color), 0.05)'};
`;
