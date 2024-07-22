import React, { useState } from 'react';
import axios from 'axios';
import TranslationForm from './components/TranslationForm';
import LanguageSelector from './components/LanguageSelector';
import SpeechInput from './components/SpeechInput';
import AudioOutput from './components/AudioOutput';

function App() {
  const [translatedText, setTranslatedText] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const handleTranslation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text: sourceText,
        target: targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TranslationForm setSourceText={setSourceText} handleTranslation={handleTranslation} />
      <LanguageSelector setTargetLanguage={setTargetLanguage} />
      <div>
        <h3>Translated Text</h3>
        <p>{translatedText}</p>
        <AudioOutput text={translatedText} />
      </div>
      <SpeechInput setSourceText={setSourceText} />
    </div>
  );
}

export default App;
