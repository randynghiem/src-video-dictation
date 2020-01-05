import './app.css';
import React from 'react';
import SearchToolbar from '../components/search-toolbar';
import CaptionViewer from '../components/caption-viewer';
import PlayerController from "./player-controller";

function App() {
  return (
    <div className="container">
      <div className="app-toolbar mb-3 mt-3">
        <SearchToolbar />
      </div>
      <div className="app-player mb-3">
        <PlayerController />
      </div>
      <div className="app-caption">
        <CaptionViewer />
      </div>
    </div>
  );
}

export default App;
