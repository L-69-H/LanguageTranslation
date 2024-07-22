import React from 'react';

function LanguageSelector({ setTargetLanguage }) {
  return (
    <select onChange={(e) => setTargetLanguage(e.target.value)}>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      {/* Add more languages as needed */}
    </select>
  );
}

export default LanguageSelector;
