import chroma from 'chroma-js';

import { Color, Status } from '../types';

const COMPUTED = getComputedStyle(document.body);

const c = (str: TemplateStringsArray) => COMPUTED.getPropertyValue(`--${str}-color`);

const INFO = c`info`;
const WARNING = c`warning`;
const SUCCESS = c`success`;
const ERROR = c`error`;

const colors: Record<Status, Color> = {
  [Status.Disabled]: {
    o: `rgba(111, 111, 111)`,
    t: `rgba(111, 111, 111, 0.2)`,
  },
  [Status.Default]: {
    o: `var(--primary-text-color)`,
    t: `rgba(111, 111, 111, 0.2)`,
  },
  [Status.Info]: {
    o: INFO,
    t: chroma(INFO).alpha(0.2).hex(),
  },
  [Status.Warning]: {
    o: WARNING,
    t: chroma(WARNING).alpha(0.2).hex(),
  },
  [Status.Success]: {
    o: SUCCESS,
    t: chroma(SUCCESS).alpha(0.2).hex(),
  },
  [Status.Error]: {
    o: ERROR,
    t: chroma(ERROR).alpha(0.2).hex(),
  },
};

export default colors;
