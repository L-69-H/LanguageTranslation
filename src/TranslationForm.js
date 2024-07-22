import React, { useState } from 'react';

function TranslationForm({ setSourceText, handleTranslation }) {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setSourceText(text);
    handleTranslation();
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button type="submit">Translate</button>
    </form>
  );
}

export default TranslationForm;
