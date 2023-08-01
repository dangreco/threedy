export interface Color {
  o: string;
  t: string;
}

export enum Status {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
  Default = 'default',
  Disabled = 'disabled',
}

export enum Integration {
  Octoprint = 'octoprint',
  PrusaLink = 'prusalink',
  Dremel = 'dremel',
  Anycubic = 'anycubic',
  FlashForge = 'flashforge',
  Moonraker = 'moonraker',
  MQTT = 'mqtt',
}
