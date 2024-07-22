# Language Translation Web Application

This is a web application for language translation with additional features such as speech-to-text, text-to-speech, and audio file processing.

## Features

- **Text Translation**: Translate text between various languages.
- **Speech Input**: Convert spoken words into text using speech recognition.
- **Text-to-Speech**: Convert translated text to speech and play it.
- **Audio File Processing**: Upload an audio file URL for transcription.

## Technologies Used

- React
- Axios
- MyMemory Translation API
- Deepgram Speech Recognition API
- SpeechSynthesis API

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
2. Install Dependencies

Make sure you have Node.js and npm installed. Then, install the necessary packages:

```bash
npm install
npm start

## Deployment

### Vercel Deployment

1. Go to [Render](https://render.com) and log in or sign up.
2. Click on "New Project".
3. Import your GitHub repository by connecting your GitHub account.
4. Follow the prompts to set up and deploy your project.
5. Vercel will automatically build and deploy your project. You will receive a unique URL where your application will be accessible.

### Push to GitHub

Make sure your code is pushed to a GitHub repository.

## Usage

### Enter Text

Type the text you want to translate in the input box.

### Select Languages

Choose the source and target languages from the dropdown menus.

### Translate

Click the "Translate" button to get the translated text.

### Play Translated Text

Click the "Play Translation" button to hear the translated text.

### Pause/Resume Translation

Use the "Pause Translation" or "Resume Translation" button to control the speech playback.

### Speech Input

Click "Start Speech Input" to start recording spoken words and automatically translate them.

### Upload Audio File

Paste the URL of your audio file and click "Process Audio URL" to get a transcription of the audio.
