import axios from 'axios';
import { getUrlParameter } from '../utils/url';
import { loadedCaptions } from './caption-event';

/**
 * Actions
 */
const UPDATE_VIDEO_URL = 'search/UPDATE_VIDEO_URL';
const defaultState = {
  link: '',
  videoId: null
};

/**
 * trigger loading of video
 * @param {string} link video URL provided by users
 */
export const loadVideoUrl = (link) => {
  return dispatch => {
    const videoId = getUrlParameter(link, 'v');
    const captionUrl = `https://voka.azurewebsites.net/api/v1/captions/${videoId}/de`;

    // dispatch updateVideoUrl event
    dispatch(updateVideoUrl(link, videoId));

    // fetch data from server
    axios.get(captionUrl)
      .then(response => {
        dispatch(loadedCaptions(response.data));
      })
      .catch(err => {
        console.log("err: ", err);
        dispatch(loadedCaptions([]));
      });
  };
};


/**
 * trigger loading of video
 * @param {string} link video URL provided by users
 */
export const updateVideoUrl = (link, videoId) => ({
  type: UPDATE_VIDEO_URL,
  link,
  videoId
});

/**
 * handle state change triggered by search toolbar
 * @param {string} state current state of search toolbar
 * @param {object} action triggered action by React components
 */
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case UPDATE_VIDEO_URL:
      return {
        link: action.link,
        videoId: action.videoId
      };
    default:
      return state;
  }
}


