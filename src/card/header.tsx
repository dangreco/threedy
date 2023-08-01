import { FunctionComponent } from 'preact';
import { styled } from 'styled-components';

import colors from '@shared/colors';
import { Button, Caption, Icon, Progress, Text } from '@shared/components';

import { Status } from '@types';

const StatusIcons: Record<Status, string> = {
  [Status.Disabled]: 'mdi:printer-3d-nozzle-alert',
  [Status.Default]: 'mdi:printer-3d-nozzle',
  [Status.Info]: 'mdi:printer-3d-nozzle',
  [Status.Warning]: 'mdi:printer-3d-nozzle-alert',
  [Status.Success]: 'mdi:printer-3d-nozzle',
  [Status.Error]: 'mdi:printer-3d-nozzle-alert',
};

interface Props {
  name?: string;
  state?: string;
  progress?: number;
}

export const Header: FunctionComponent<Props> = ({ name, progress }) => {
  const status = Status.Info;
  const COLOR = colors[status];
  const ICON = StatusIcons[status];

  return (
    <HeaderRoot>
      <IconRoot>
        <IconBackground color={COLOR.t}>
          <Icon color={COLOR.o} icon={ICON} size={21} />
        </IconBackground>
        <ProgressRoot>
          <Progress value={progress} size={44} width={2} color={COLOR.o} />
        </ProgressRoot>
      </IconRoot>
      <Info>
        <Text bold>{name}</Text>
        <Caption bold>Printing • 65%</Caption>
      </Info>
      <ControlsRoot>
        <Button square>
          <Icon icon={'mdi:pause'} size={21} />
        </Button>
        <Button square critical>
          <Icon icon={'mdi:alert-octagon'} size={21} />
        </Button>
      </ControlsRoot>
    </HeaderRoot>
  );
};

const HeaderRoot = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Info = styled.div``;

const IconRoot = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBackground = styled.div<{ color?: string }>`
  position: relative;
  width: 42px;
  height: 42px;
  background-color: ${(props) => props.color};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const ControlsRoot = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
