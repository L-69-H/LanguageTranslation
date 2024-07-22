import React from 'react';

function AudioOutput({ text }) {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <button onClick={playAudio}>
      Play Translated Text
    </button>
  );
}

export default AudioOutput;
