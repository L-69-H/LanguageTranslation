import React, { useState } from 'react';
import axios from 'axios';
import TranslationForm from './TranslationForm';
import LanguageSelector from './LanguageSelector';
import SpeechInput from './SpeechInput';
import AudioOutput from './AudioOutput';

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
      <div>
      </div>
    </div>
  );
}

export default App;
