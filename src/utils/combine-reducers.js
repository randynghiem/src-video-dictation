// combine all event handlers
import { combineReducers } from "redux";
import caption from '../event-handlers/caption-event';
import query from '../event-handlers/input-event';

export default combineReducers({
  caption,
  query
});
