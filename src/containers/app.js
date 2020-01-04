import React from 'react';
import YTPlayer from '../components/youtube-player';

function App() {

  const playing = (event) => {
    const player = event.target;
    let currentTime = player.getCurrentTime();
    console.log("current time: " + currentTime);
  }

  return (
    <div>
      <YTPlayer
        video="PknJ2hDouuU"
        autoplay="0"
        onProgressing={playing}
      />
    </div>
  );
}

export default App;
