import React from 'react';
import { connect } from 'react-redux';
import YTPlayer from '../components/youtube-player';
import { jumpNextLine } from '../event-handlers/caption-event';

const PlayerController = ({ videoId, playAt, onJump }) => {

  return (
    videoId &&
    <YTPlayer
      video={videoId}
      playAt={playAt}
      onProgressing={onJump}
      width="720"
      height="405"
      autoplay="1"
    />
  );
};

export default connect(
  (state) => ({
    videoId: state.query.videoId,
    playAt: state.caption.playAt
  }),
  (dispatch) => ({
    onJump: (start) => dispatch(jumpNextLine(start))
  })
)(PlayerController);
