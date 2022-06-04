import React from "react";
import { NavLink } from "react-router-dom";
import soundEngine from "../lib/soundEngine";

export default function Nav() {
  function onVolumeChange(event) {
    soundEngine.setVolume(event.target.value / 100);
  }

  return (
    <nav className="nav">
      <div className="nav-section">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="nav-section">
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          type="range"
          defaultValue={75}
          onChange={onVolumeChange}
          min={0}
          max={100}
        />
      </div>
    </nav>
  );
}
