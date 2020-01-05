/**
 * Action and default state
 */
const CLICK_CAPTION_LINE = 'caption/CLICK_CAPTION_LINE';
const LOADED_CAPTIONS = 'caption/LOADED_CAPTIONS';
const JUMP_NEXT_LINE = 'caption/JUMP_NEXT_LINE';
const defaultState = {
  lines: [],
  playAt: null,
  curStart: -1
};

/**
 * create a new action object for clicking event
 * @param {number} startTime start time of clicked caption item
 */
export const clickCaptionLine = (startTime) => ({
  type: CLICK_CAPTION_LINE,
  start: startTime,
  playAt: (startTime + '|' + (new Date()).getTime())
});

/**
 * create a new action object when caption items has been loaded from server
 * @param {array} caption Array of caption items loaded from server
 */
export const loadedCaptions = (lines) => ({
  type: LOADED_CAPTIONS,
  lines
});

/**
 * create a new action object when the player is progressing to next interval
 * @param {number} nextLine currenty playing timestamp
 */
export const jumpNextLine = (nextLine) => ({
  type: JUMP_NEXT_LINE,
  nextLine
});

/**
 * mark current line
 * @param {array} caption array of caption lines
 * @param {number} startTime current playing timestamp
 */
const markCurrentLine = (lines, cur) => {
  return lines.map(item => ({
    ...item,
    current: (cur >= item.start && cur < item.end) ? 'current' : ''
  }));
};

const findCurStart = (lines, timestamp) => {
  let result = lines.find(item => timestamp >= item.start && timestamp < item.end);
  return result.start;
};

const formatStartTime = (start) => {
  let secondTotal = Math.floor(start);
  let seconds = secondTotal % 60;
  let minutes = Math.floor(secondTotal / 60);

  if (minutes < 10) {
    return '0' + minutes + ':' + ('0' + seconds).slice(-2);
  } else {
    return minutes + ':' + ('0' + seconds).slice(-2);
  }
};

/**
 * reducer to handle caption related events
 * @param {object} state current caption-related state
 * @param {object} action action triggered by other components
 */
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case CLICK_CAPTION_LINE:
      return {
        ...state,
        lines: markCurrentLine(state.lines, action.start),
        playAt: action.playAt
      };
    case LOADED_CAPTIONS:
      // reformat start field
      const lines = action.lines.map(item => ({
        ...item,
        formattedStart: formatStartTime(item.start)
      }));

      return {
        ...state,
        lines: lines
      };
    case JUMP_NEXT_LINE:
      const curStart = findCurStart(state.lines, action.nextLine);
      if (curStart === state.curStart) return state;

      return {
        ...state,
        lines: markCurrentLine(state.lines, action.nextLine),
        curStart: curStart,
      };
    default:
      return state;
  }
}