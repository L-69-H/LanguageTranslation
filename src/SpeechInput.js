import React, { useState } from 'react';

function SpeechInput({ setSourceText }) {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    const recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      setSourceText(event.results[0][0].transcript);
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
  };

  return (
    <button onClick={startRecording}>
      {isRecording ? 'Listening...' : 'Start Speech Input'}
    </button>
  );
}

export default SpeechInput;
