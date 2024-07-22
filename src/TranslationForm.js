import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TranslationForm.css';
import fs from "fs";
import OpenAI from "openai";

function TranslationForm() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language
  const [isListening, setIsListening] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  // List of languages for dropdown
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    // Add more languages as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;
      
      // Make the request to MyMemory API
      const response = await axios.get(url);

      // Check if source language is not English
      const translation = sourceLanguage === 'en' 
        ? response.data.responseData.translatedText
        : response.data.matches[1]?.translation; // Take the second response

      // Set the translated text
      setTranslatedText(translation || 'Translation not available');
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const playTranslatedText = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLanguage; // Set language for TTS
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognition) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    const recognitionInstance = new recognition();
    recognitionInstance.lang = sourceLanguage;
    recognitionInstance.interimResults = false;
    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    return recognitionInstance;
  };

  useEffect(() => {
    if (isListening) {
      const recognition = initializeSpeechRecognition();
      if (recognition) {
        recognition.start();
        recognition.onend = () => setIsListening(false);
      }
    }
  }, [isListening]);

  const handleStartListening = () => {
    setIsListening(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };
  
 
  const openai = new OpenAI();
  
  async function handleFileUpload() {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("/path/to/file/audio.mp3"),
      model: "whisper-1",
    });
  
    console.log(transcription.text);
  }
  



  return (
    <div className="translation-container">
      <h1 className="title">Language Translation App</h1>
      <form className="translation-form" onSubmit={handleSubmit}>
        <textarea
          className="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
        />
        <div className="controls">
          <div className="language-selector">
            <label htmlFor="source-language" className="language-label">Source Language:</label>
            <select
              id="source-language"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="language-selector">
            <label htmlFor="target-language" className="language-label">Target Language:</label>
            <select
              id="target-language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Translate</button>
          <button type="button" onClick={handleStartListening} className="start-listening-button">
            {isListening ? 'Listening...' : 'Start Speech Input'}
          </button>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <button type="button" onClick={handleFileUpload} className="upload-button">
            Upload Audio
          </button>
        </div>
      </form>
      <div className="result-container">
        <h2 className="result-title">Translated Text</h2>
        <textarea
          className="result-text-area"
          value={translatedText}
          readOnly
          placeholder="Translation will appear here"
        />
        <button onClick={playTranslatedText} className="play-button">Play Translation</button>
      </div>
    </div>
  );
}

export default TranslationForm;
