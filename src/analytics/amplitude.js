import amplitude from 'amplitude-js';
import EVENTS from './events';

amplitude.getInstance().init('e4e8eac7b327f32d54b6e1c3ad6aa180');

export const send = (event) => {
  switch (event) {
    case EVENTS.PAGE_VIEW:
      const location = window && window.location
      amplitude.getInstance().logEvent(event, { location: location ? location.pathname + location.search + location.hash : undefined });
      break;
    
    default:
      amplitude.getInstance().logEvent(event);
  }
}