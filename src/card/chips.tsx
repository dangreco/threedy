import { FunctionComponent } from 'preact';
import { styled } from 'styled-components';

import { Chip, Icon } from '@shared/components';

export const Chips: FunctionComponent = () => {
  return (
    <ChipsRoot>
      <Chip>
        <Icon size={16} icon={'mdi:printer-3d-nozzle-heat'} />
        205.1°C
      </Chip>
      <Chip>
        <Icon size={16} icon={'mdi:heating-coil'} />
        59.8°C
      </Chip>
      <Chip>
        <Icon size={16} icon={'mdi:alarm'} />
        32 min
      </Chip>
    </ChipsRoot>
  );
};

const ChipsRoot = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;
