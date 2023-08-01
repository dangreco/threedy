import { FunctionComponent } from 'preact';
import { styled } from 'styled-components';

interface Props {
  value?: number;
  size?: number;
  width?: number;
  color?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const Progress: FunctionComponent<Props> = ({ value, size, width, color }) => {
  const VALUE = clamp(value ?? 0, 0, 1);
  const WIDTH = width ?? 3;
  const COLOR = color ?? 'var(--primary-color)';
  const SIZE = size ?? 42;
  const R = (SIZE - 2 * WIDTH) / 2;
  const C = 2 * Math.PI * R;

  const offset = C - VALUE * C;

  return (
    <svg width={SIZE} height={SIZE}>
      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        strokeWidth={WIDTH}
        stroke={COLOR}
        strokeDasharray={`${C}`}
        strokeDashoffset={`${offset}`}
      />
      <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} strokeWidth={WIDTH} stroke={COLOR} opacity={0.2} />
    </svg>
  );
};

const Circle = styled.circle`
  fill: transparent;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.25s linear;
`;
