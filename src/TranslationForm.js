import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './TranslationForm.css';

function TranslationForm() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); 
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const utteranceRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'sw', name: 'Swahili' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'he', name: 'Hebrew' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'cs', name: 'Czech' },
    { code: 'sk', name: 'Slovak' },
    { code: 'ro', name: 'Romanian' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'el', name: 'Greek' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'hr', name: 'Croatian' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'et', name: 'Estonian' },
    { code: 'mt', name: 'Maltese' },
    { code: 'km', name: 'Khmer' },
    { code: 'la', name: 'Latin' },
    { code: 'eu', name: 'Basque' },
    { code: 'cy', name: 'Welsh' },
    { code: 'ca', name: 'Catalan' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;

      const response = await axios.get(url);

      const translation = sourceLanguage === 'en'
        ? response.data.responseData.translatedText
        : response.data.matches[1]?.translation; 

      setTranslatedText(translation || 'Translation not available');
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const playTranslatedText = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLanguage; 
      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance; 
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  const handlePauseToggle = () => {
    if (window.speechSynthesis && utteranceRef.current) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      console.error('Speech synthesis or utterance not available.');
    }
  };

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

  const handleUrlChange = (e) => {
    setAudioUrl(e.target.value);
  };

  const handleFileUpload = async () => {
    if (!audioUrl) return;

    try {
      const response = await axios.post(
        'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true',
        {
          url: audioUrl,
        },
        {
          headers: {
            Authorization: 'Token 998a19c0605baadee2917bf98bda7874fb7f0311',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!isPaused) {
        setText(response.data.results.channels[0].alternatives[0].transcript);
      }
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

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
            type="text"
            value={audioUrl}
            onChange={handleUrlChange}
            placeholder="Paste the URL of your audio file"
            className="url-input"
          />
          <button type="button" onClick={handleFileUpload} className="upload-button">
            Process Audio URL
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
        <div className='button-group'>
          <button onClick={playTranslatedText} className="play-button">Play Translation</button>
          <button type="button" onClick={handlePauseToggle} className="pause-button">
            {isPaused ? 'Resume Translation' : 'Pause Translation'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslationForm;
